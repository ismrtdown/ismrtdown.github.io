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
}: {
  station_code: STATION_CODES;
  size: "normal" | "large";
}) {
  return (
    <div className="flex overflow-hidden rounded-xl">
      <div
        className={cn(
          "flex items-center justify-center ",
          size === "large" ? "h-8 w-20" : "h-4 w-10",
        )}
        style={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          backgroundColor: LINE_COLOR_MAPPING[LineMappings[station_code]],
        }}
      >
        <span className="font-semibold text-white text-xs leading-none">
          {station_code}
        </span>
      </div>
    </div>
  );
}
