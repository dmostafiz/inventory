import React from 'react'
import Chart from "react-apexcharts";

export default function SalesChart() {

    const chart = {

        series: [{
            name: 'Sales',
            data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65, 35]
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
                enabled: true
            },

            stroke: {
                width: 3
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
                categories: ['Apples', 'Oranges', 'Strawberries', 'Pineapples', 'Mangoes', 'Bananas',
                    'Blackberries', 'Pears', 'Watermelons', 'Cherries', 'Pomegranates', 'Tangerines', 'Papayas'
                ],
                tickPlacement: 'on'
            },

            yaxis: {
                title: {
                    text: 'Sales',
                },
            },

            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: "horizontal",
                    shadeIntensity: 0.25,
                    gradientToColors: {
                        colors: ['#2E93fA', '#66DA26']
                    },
                    inverseColors: true,
                    opacityFrom: 0.5,
                    opacityTo: 0.75,
                    // stops: [50, 0, 100]
                },
            }
        },


    };



    return (
        <Chart
            options={chart.options}
            series={chart.series}
            type="area"
            height={350}
        />
    )
}