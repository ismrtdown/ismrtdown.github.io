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
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

function isoDateToLocalDate(
  ISOTimeString: string | number | Date,
  offsetInMinutes: number,
) {
  const newTime = new Date(ISOTimeString);
  return new Date(newTime.getTime() + offsetInMinutes * 60000);
}

// localIsoDate: 2017-05-04T18:25:11.378Z Date object
function formatTime(localIsoDate: Date) {
  function z(n: number) {
    return (n < 10 ? "0" : "") + n;
  }
  const hh = localIsoDate.getUTCHours();
  const mm = localIsoDate.getUTCMinutes();
  // const ss = localIsoDate.getUTCSeconds();
  return z(hh) + ":" + z(mm);
}

async function getData() {
  const response = await fetch(`${BACKEND_URL}/reportno`);
  const data = await response.json();
  return data;
}

export default function Page() {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isReporting, setIsReporting] = useState(true);
  const [selectedStationId, setSelectedStationId] = useState<STATION_IDS | "">(
    "",
  );
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    getData().then((data) => {
      const dataset = {
        labels: data.map((row: { time: string }) =>
          formatTime(isoDateToLocalDate(row["time"], 8 * 60)),
        ),
        datasets: [
          {
            label: "No. of Reports",
            data: data.map((row: { [x: string]: string }) => row["no"]),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      };
      setData(dataset);
      setIsDataLoading(false);
    });
  }, []);
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
      <div className="w-full max-h-[50vh] max-w-[80vh]">
        {!isDataLoading && (
          <Line
            className=""
            data={
              data as {
                labels: [];
                datasets: [];
              }
            }
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top" as const,
                },
                title: {
                  display: true,
                  text: "MRT disruptions reported",
                },
              },
            }}
          />
        )}
      </div>
    </>
  );
}
