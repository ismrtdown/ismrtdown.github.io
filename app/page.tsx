"use client";
import { BACKEND_URL } from "@/lib/utils";
import { MrtMap, STATION_IDS } from "@/lib/MrtMap/index";
import { StatusIndicator } from "@/lib/Status";
import { ReactNode, useEffect, useRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import StationCodeToNameMapping from "@/public/station_code_to_station.json";
import { STATION_CODES, StationBar } from "@/lib/StationBar";
import MrtMapping from "@/public/mrt_mapping.json";

const COLOR_MAPPING = {
  0: "green",
  1: "orange",
  2: "red",
};

export default function Home() {
  const rMapRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  function modifyTextHandler(mapRef: React.RefObject<HTMLDivElement>) {
    //@ts-expect-error itsok
    rMapRef.current = mapRef;
  }
  const [rangeBanners, setRangeBanners] = useState([]);

  async function getRangeBreakdowns() {
    const response = await fetch(`${BACKEND_URL}/range-delayed`);

    const data = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const banners = data.map((msg: any) => {
      const from_station_code = msg[0];
      const from_station_name =
        StationCodeToNameMapping[from_station_code as STATION_CODES]["name"];

      const to_station_code = msg[1];
      const to_station_name =
        StationCodeToNameMapping[to_station_code as STATION_CODES]["name"];

      return (
        <span key={`${from_station_code}-${to_station_code}`}>
          ⚠️ Delays from {from_station_name}{" "}
          <StationBar
            station_code={from_station_code}
            size="normal"
            className="inline-block mx-1"
          />{" "}
          to {to_station_name}{" "}
          <StationBar
            size="normal"
            station_code={to_station_code}
            className="inline-block mx-1"
          />
        </span>
      );
    });

    setRangeBanners(banners);
  }

  useEffect(() => {
    async function r() {
      const res = await fetch(`${BACKEND_URL}/report`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      const labels = Array.from(
        //@ts-expect-error its ok
        (
          rMapRef?.current?.current as unknown as HTMLDivElement
        ).querySelectorAll("#labels"),
      )[0];
      // console.log(labels);

      labels.querySelectorAll("a").forEach((el) => {
        const stationId = el.id as STATION_IDS;
        const textEle = el.querySelector("text");
        // const posEle = textEle?.querySelector("tspan");
        // console.log(posEle?.x, posEle?.y);
        const newTspan = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "tspan",
        );
        const status = MrtMapping[stationId].mrtCodes.reduce((acc, cur) => {
          // console.log(reports[cur]);
          return Math.max(acc, data[cur] as number);
        }, 0);

        newTspan.innerHTML = renderToStaticMarkup(
          <StatusIndicator
            status={
              COLOR_MAPPING[status as keyof typeof COLOR_MAPPING] as
                | "green"
                | "red"
                | "orange"
            }
          />,
        );
        // newTspan.innerHTML = renderToStaticMarkup(<p>testing?</p>)
        // newTspan.textContent = "Test here"
        newTspan.setAttribute("dx", "3");
        // newTspan.setAttribute("fill", "red");
        textEle?.appendChild(newTspan);
        // newTspan.render
        // createPortal(<StatusIndicator label="Test" status="green" />, newTspan);
      });
      await getRangeBreakdowns();
    }
    r();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(false);
  }, []);

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="w-full md:w-8/12 font-rc-big">
          {rangeBanners.length > 0 && (
            <div className="w-full space-y-2 p-2">
              {rangeBanners.map((banner, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg bg-yellow-100 border border-yellow-300 px-4 py-2 text-sm"
                >
                  {banner}
                  <button
                    className="ml-4 text-xs font-bold text-gray-600 hover:text-black"
                    onClick={() =>
                      setRangeBanners((prev) =>
                        prev.filter((_, i) => i !== idx),
                      )
                    }
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mx-2 my-2 text-center">
        <h1 className="text-2xl md:text-6xl font-extrabold tracking-tighter my-2">
          Is the MRT down?
        </h1>
        <h2 className="text-xl md:text-2xl tracking-tighter">
          Look at the indicators besides the station, zoom in if you have too!
        </h2>
      </div>
      <div className="w-full">
        {!isLoading && (
          <MrtMap
            stationClickHandler={(stationName) => {
              // alert(stationName);
            }}
            modifyTextHandler={modifyTextHandler}
          />
        )}
      </div>
    </>
  );
}
