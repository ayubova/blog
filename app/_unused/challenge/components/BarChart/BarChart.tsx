// import React, {useMemo} from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import {Bar} from "react-chartjs-2";
// import {convertToMonthlyFormat} from "./utils"
// import {InterviewStat} from "types";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const options = {
//   color: "black",
//   responsive: true,
//   scales: {
//     x: {
//       ticks: {
//         color: "black"
//       }
//     },
//     y: {
//       ticks: {
//         color: "black"
//       }
//     }
//   },  
//   plugins: {
//     defaults: {
//       color: "lightGreen"
//     },
//     legend: {
//       position: "top" as const,
//       labels: {
//         font: {
//           size: 16,
//           family: "'Roboto Serif', sans-serif"
//         }
//       },
//     },
//     title: {
//       display: true,
//       color: "black",
//       text: "Monthly interview prep time tracking",
//       font: {
//         size: 20,
//         family: "'Roboto Serif', sans-serif",
//         weight: "normal",
//       }
//     },
    
//   },
// };

// type Props = {
// interviewStats: InterviewStat[]
// };

// const BarChart = ({interviewStats}: Props) => {
//   const dataset = useMemo(() => convertToMonthlyFormat(interviewStats), [interviewStats]);

//   const data = useMemo(() => ({
//     labels: dataset.map(({label})=> label),
//     datasets: [
//       {
//         label: "Time spent in hours",
//         data: dataset.map(({totalTime}) => (totalTime / 60).toFixed(1)),
//         backgroundColor: "#D3D0CA",
//       },
//     ],
//   }), [dataset]);

//   return <Bar options={options} data={data} />;
// }

// export default BarChart