"use client";
import { BACKEND_URL } from "@/lib/utils";
import { MrtMap } from "@/lib/MrtMap/index";
import { useEffect, useState } from "react";

// const COLOR_MAPPING ={
//   0: "",
// }

export default function Home() {
	const [rangeBanners, setRangeBanners] = useState<
		{ text: string }[]
	>([]);

  useEffect(() => {
		getRangeBreakdowns();
  }, []);

	async function getRangeBreakdowns() {
		const response = await fetch(`${BACKEND_URL}/range-delayed`)

		const data = await response.json();
		const banners = data.map((msg: any) => ({
				text: `⚠️ Delays from ${msg[0]} to ${msg[1]}`, 
			}));

		setRangeBanners(banners);
	}

  return (
    <>
			{rangeBanners.length > 0 && (
				<div className="w-full space-y-2 p-2">
					{rangeBanners.map((banner, idx) => (
						<div
							key={idx}
							className="flex items-center justify-between rounded-lg bg-yellow-100 border border-yellow-300 px-4 py-2 text-sm"
						>
							<span>{banner.text}</span>
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
