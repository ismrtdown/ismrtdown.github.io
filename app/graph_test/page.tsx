
"use client"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, } from "chart.js";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from 'react';
ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

function isoDateToLocalDate(ISOTimeString: string | number | Date, offsetInMinutes: number) {
    var newTime = new Date(ISOTimeString);
    return new Date(newTime.getTime() + (offsetInMinutes * 60000));
}

// localIsoDate: 2017-05-04T18:25:11.378Z Date object
function formatTime(localIsoDate: { getUTCHours: () => any; getUTCMinutes: () => any; getUTCSeconds: () => any; }) {
    function z(n: number) { return (n < 10 ? '0' : '') + n }
    var hh = localIsoDate.getUTCHours();
    var mm = localIsoDate.getUTCMinutes();
    var ss = localIsoDate.getUTCSeconds();
    return z(hh) + ':' + z(mm)
}

async function getData() {
    let response = await fetch("https://backend-09gi.onrender.com/reportno")
    let data = await response.json()
    return data
}

export default function Page() {
    const [data, setData] = useState([])
    useEffect(() => {
        getData().then(setData)
    })
    let dataset = {
        labels: data.map((row: { time: any; }) => formatTime(isoDateToLocalDate(row["time"], 8 * 60))),
        datasets: [
            {
                label: "No. of Reports",
                data: data.map((row: { [x: string]: any; }) => row["no"]),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]

    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    let sad = (
        <>
            <div className="mx-2 my-2 text-center">
                <h1 className="text-2xl md:text-6xl my-2 font-extrabold tracking-tighter">
                    Reporting a disruption?
                </h1>
                <h2 className="text-xl md:text-2xl tracking-tighter">
                    Click on the station that has a disruption to report it.
                </h2>
            </div>
            <div className="">
                <Line className="" data={dataset} options={options} />
            </div>
        </>
    );


    return sad
}