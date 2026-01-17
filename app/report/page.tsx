"use client";

import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { MrtMap, STATION_IDS } from "@/lib/MrtMap/index";
import { STATION_CODES, StationBar } from "@/lib/StationBar";
import { BACKEND_URL } from "@/lib/utils";
import MrtMapping from "@/public/mrt_mapping.json";
import { useState } from "react";

export default function Page() {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isReporting, setIsReporting] = useState(true);
  const [selectedStationId, setSelectedStationId] = useState<STATION_IDS | "">(
    "",
  );

  function reportStationClickHandler(station: STATION_IDS) {
    setSelectedStationId(station);
    setIsReportDialogOpen(true);
  }
  async function reportStationCodeHandler(stationCode: STATION_CODES) {
    setIsReporting(false);
    await fetch(`${BACKEND_URL}/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ station_code: stationCode }),
    });
  }

  return (
    <>
      <Dialog
        open={isReportDialogOpen}
        onOpenChange={(open) => {
          setIsReportDialogOpen(open);
          setTimeout(() => setIsReporting(true), 100);
        }}
      >
        <DialogContent>
          {isReporting && selectedStationId && (
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Which station is down?
              </DialogTitle>
              {MrtMapping[selectedStationId].mrtCodes.map((station_code) => (
                <DialogDescription key={station_code}>
                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      reportStationCodeHandler(station_code as STATION_CODES)
                    }
                  >
                    <StationBar
                      station_code={station_code as STATION_CODES}
                      size="large"
                      name={MrtMapping[selectedStationId].name}
                    />
                  </button>
                </DialogDescription>
              ))}
            </DialogHeader>
          )}
          {!isReporting && selectedStationId && (
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Breakdown Reported
              </DialogTitle>
              <DialogDescription>Thanks for reporting!</DialogDescription>
            </DialogHeader>
          )}
        </DialogContent>
      </Dialog>

      <div className="mx-2 my-2 text-center">
        <h1 className="text-2xl md:text-6xl font-extrabold tracking-tighter my-2">
          Reporting a disruption?
        </h1>
        <h2 className="text-xl md:text-2xl tracking-tighter">
          Click on the station that has a disruption to report it.
        </h2>
      </div>
      <div className="w-full">
        <MrtMap stationClickHandler={reportStationClickHandler} />
      </div>
    </>
  );
}
