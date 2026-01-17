import Map from "./Map";
import { useEffect, useRef, useState } from "react";
import MrtMapping from "@/public/mrt_mapping.json"

export type STATION_IDS = keyof typeof MrtMapping;

interface Props{
  stationClickHandler: (name: STATION_IDS ) => void;
}

export function MrtMap(props: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      // console.log(mapRef.current);
      const labels = Array.from(mapRef.current.querySelectorAll("#labels"))[0];
      // console.log(labels);
      // const links = Array.from(Array.from(labels)[0].querySelectorAll("a"));
      labels.querySelectorAll("a").forEach((el) => {
        const textEle = el.querySelector("tspan");


        const station = el.id as keyof typeof MrtMapping;

        el.style.cursor = "pointer";
        el.onclick = (e) => {
          e.preventDefault();
          console.log(`Button clicked: ${station}`);
          // alert(`You clicked on ${station}`);
          props.stationClickHandler(station);
        };
      });

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
