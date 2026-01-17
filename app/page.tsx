"use client";
import { MrtMap } from "@/lib/MrtMap/index";

function Main() {
  return (
    <div className="w-full">
      <MrtMap stationClickHandler={(stationName) => {
        alert(stationName);
      }} />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <h1 className="text-4xl md:text-8xl font-extrabold tracking-tighter">
        Is the MRT down?
      </h1>
      {Main()}
    </>
  );
}
