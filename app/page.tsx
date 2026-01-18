"use client";
import { MrtMap } from "@/lib/MrtMap/index";
import { StatusIndicator } from "@/lib/Status";
import { BACKEND_URL } from "@/lib/utils";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { renderToStaticMarkup } from "react-dom/server";

const COLOR_MAPPING = {
  0: "green",
  1: "orange",
  2: "red",
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState({});
  useEffect(() => {
    fetch(`${BACKEND_URL}/report`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const data = await res.json();
      setReports(data);
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(false);
  }, []);

  function modifyTextHandler(mapRef: React.RefObject<HTMLDivElement>) {
    const labels = Array.from(mapRef.current.querySelectorAll("#labels"))[0];
    // console.log(labels);

    labels.querySelectorAll("a").forEach((el) => {
      const textEle = el.querySelector("text");
      // const posEle = textEle?.querySelector("tspan");
      // console.log(posEle?.x, posEle?.y);
      const newTspan = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "tspan",
      );
      newTspan.innerHTML = renderToStaticMarkup(
        <StatusIndicator status="green" />,
      );
      // newTspan.innerHTML = renderToStaticMarkup(<p>testing?</p>)
      // newTspan.textContent = "Test here"
      newTspan.setAttribute("dx", "5");
      // newTspan.setAttribute("fill", "red");
      textEle?.appendChild(newTspan);
      // newTspan.render
      // createPortal(<StatusIndicator label="Test" status="green" />, newTspan);
    });
  }

  return (
    <>
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
              alert(stationName);
            }}
            modifyTextHandler={modifyTextHandler}
          />
        )}
      </div>
    </>
  );
}
