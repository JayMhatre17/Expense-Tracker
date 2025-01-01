import React from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Reports = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        position: "bottom",
        color: "black",
        text: "Expense Report",
      },
    },
  };
  const piedata = {
    labels: [
      "Rent",
      "Groceries",
      "Utilities",
      "Entertainment",
      "Miscellaneous",
    ],
    datasets: [
      {
        label: "Expenses",
        data: [500, 300, 100, 150, 50],
        backgroundColor: [
          "rgba(255, 99, 132, 0.9)",
          "rgba(54, 162, 235, 0.9)",
          "rgba(255, 206, 86, 0.9)",
          "rgba(75, 192, 192, 0.9)",
          "rgba(153, 102, 255, 0.9)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],

        borderWidth: 1,
      },
    ],
  };
  const linedata = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Expenses",
        data: [12, 19, 3, 5, 2, 3, 7],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Expenses2",
        data: [111, 100, 21, 55, 2, 3, 71],
        borderColor: "rgb(241, 9, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Expenses3",
        data: [12, 8, 22, 15, 9, 11, 7],
        borderColor: "rgb(75, 192, 100)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <>
      <div className="text-center text-2xl font-bold my-4">Expense Reports</div>
      <div className="flex flex-col items-center">
        <div className="w-full md:w-1/2 p-4">
          <div className="text-center text-xl font-semibold mb-2">
            Expense Distribution
          </div>
          <Pie options={options} data={piedata} />
        </div>
        <div className="w-full md:w-3/4 p-4 mt-8">
          <div className="text-center text-xl font-semibold mb-2">
            Weekly Expenses
          </div>
          <Line options={options} data={linedata} />
        </div>
      </div>
    </>
  );
};

export default Reports;
