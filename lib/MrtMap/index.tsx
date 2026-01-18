import Map from "./Map";
import { useEffect, useRef, useState } from "react";
import MrtMapping from "@/public/mrt_mapping.json";

export type STATION_IDS = keyof typeof MrtMapping;

interface Props {
  stationClickHandler?: (name: STATION_IDS) => void;
  modifyTextHandler?: (mapRef: React.RefObject<HTMLDivElement>) => void;
}

export function MrtMap({
  stationClickHandler = () => {},
  modifyTextHandler = () => {},
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      // console.log(mapRef.current);
      const labels = Array.from(mapRef.current.querySelectorAll("#labels"))[0];
      // console.log(labels);
      // const links = Array.from(Array.from(labels)[0].querySelectorAll("a"));

      labels.querySelectorAll("a").forEach((el) => {
        // const textEle = el.querySelector("text");
        // const posEle = textEle?.querySelector("tspan");
        // console.log(posEle?.x, posEle?.y);
        // const newTspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        // newTspan.textContent = "Test here"
        // newTspan.setAttribute("dx", "5");
        // newTspan.setAttribute("fill", "red");
        // textEle?.appendChild(newTspan);

        const station = el.id as keyof typeof MrtMapping;

        el.style.cursor = "pointer";
        el.onclick = (e) => {
          e.preventDefault();
          console.log(`Button clicked: ${station}`);
          // alert(`You clicked on ${station}`);
          stationClickHandler(station);
        };
      });
      modifyTextHandler(mapRef as React.RefObject<HTMLDivElement>);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(false);
    }
  }, []);
  return (
    <div style={{ opacity: isLoading ? 0 : 1 }}>
      <Map innerRef={mapRef} />
    </div>
  );
}
