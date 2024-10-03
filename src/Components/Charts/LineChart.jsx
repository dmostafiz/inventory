import React from 'react'
import dynamic from 'next/dynamic';
// import Chart from "react-apexcharts";
const Chart = dynamic(import("react-apexcharts"), {
    ssr: false
  });
  

export default function LineChart({title, keys, values}) {

    const chart = {

        series: [{
            name: title,
            data: values,
        }],

        options: {
            // annotations: {
            //     points: [{
            //         x: 'Bananas',
            //         seriesIndex: 0,
            //         label: {
            //             borderColor: '#775DD0',
            //             offsetY: 0,
            //             style: {
            //                 color: '#fff',
            //                 background: '#775DD0',
            //             },
            //             text: 'Bananas are good',
            //         }
            //     }]
            // },

            // chart: {
            //     height: 350,
            //     // type: 'bar',
            // },

            plotOptions: {
                bar: {
                    borderRadius: 2,
                    columnWidth: '50%',
                }
            },

            dataLabels: {
                enabled: false,
                colors:['#7BDDCF']
            },

            stroke: {
                width: 2,
                curve: 'straight',
                colors: ['#7BDDCF']
            },

            grid: {
                row: {
                    colors: ['#fff', '#f2f2f2']
                }
            },
            xaxis:
             {
                labels: {
                    rotate: -45
                },
                categories: keys,
                tickPlacement: 'on'
            },

            yaxis: {
                title: {
                    text: '',
                },
            },

            fill: {
                // type: 'gradient',
                colors: ['#7BDDCF']
                // gradient: {
                //     shade: 'dark',
                //     type: "horizontal",
                //     shadeIntensity: 0.25,
                //     gradientToColors: ['#7BDDCF', '#7BDDCF', '#7BDDCF', '#7BDDCF'],
                //     inverseColors: true,
                //     opacityFrom: 0.5,
                //     opacityTo: 0.75,
                //     // stops: [50, 0, 100]
                // },
            }
        },


    };



    return (
        <Chart
            options={chart.options}
            series={chart.series}
            type="line"
            height={350}
        />
    )
}
