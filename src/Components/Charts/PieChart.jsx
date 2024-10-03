import React from 'react'
import dynamic from 'next/dynamic';
// import Chart from "react-apexcharts";
const Chart = dynamic(import("react-apexcharts"), {
    ssr: false
  });
  

export default function PieChart({name='donut', title, keys, values}) {

    const chart = {

        series: values,

        options: {
            labels: keys,  

        },


    };



    return (
        <Chart
            options={chart.options}
            series={chart.series}
            type={name}
            height={350}
        />
    )
}
