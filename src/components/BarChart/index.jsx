import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar } from "react-chartjs-2";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


function BarChart(props) {
    const { data, label } = props
    return (
        <Bar
            data={{
                labels: label,
                datasets: [
                    {
                        label: "Amount (assignments)",
                        data: data,
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',

                    }
                ]
            }}
            options={{
                legend: { display: true },
                title: {
                    display: true,
                    text: "Predicted world population (millions) in 2050"
                },
                responsive: true,
                scales: {
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: "VND",
                            }
                        }
                    ],
                    xAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: "Date in Month",
                            }
                        }
                    ],
                }

            }}
        />
    );
}

export default BarChart;