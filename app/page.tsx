"use client";
import { MrtMap } from "@/lib/MrtMap/index";

// const COLOR_MAPPING ={
//   0: "",
// }

export default function Home() {
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
        <MrtMap
          stationClickHandler={(stationName) => {
            alert(stationName);
          }}
        />
      </div>
    </>
  );
}
