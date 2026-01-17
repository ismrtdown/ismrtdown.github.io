"use client";

import { STATION_IDS } from "./MrtMap";
import LineMappings from "@/public/line_mapping.json";
import { cn } from "./utils";

export type STATION_CODES = keyof typeof LineMappings;

const LINE_COLOR_MAPPING = {
  CRL: "#97C616",
  TEL: "#9D5B25",
  CCL: "#fa9e0d",
  NSL: "#d42e12",
  JRL: "#0099aa",
  BPLRT: "#748477",
  NEL: "#9900aa",
  EWL: "#009645",
  DTL: "#005ec4",
};

export function StationBar({
  station_code,
  size,
  name,
}: {
  station_code: STATION_CODES;
  size: "normal" | "large";
  name: string;
}) {
  return (
    <div className="relative flex items-center gap-x-2">
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-xl px-3 py-2 font-bold text-sm text-white shadow-lg ring-2 ring-white/20",
          size === "large" ? "h-8 w-20" : "h-4 w-10",
        )}
        style={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          backgroundColor: LINE_COLOR_MAPPING[LineMappings[station_code]],
        }}
      >
        {station_code}
      </span>
      <div className="flex">
        <span className="text-gray-800 text-sm group-hover:underline dark:text-gray-200">
          {name}
        </span>
      </div>
    </div>
  );
}
