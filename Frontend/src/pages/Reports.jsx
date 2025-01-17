import React, { useEffect } from "react";
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
import axios from "axios";
import { useState } from "react";
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
	const [expenses, setExpenses] = useState([]);
	useEffect(() => {
		axios
			.get(`/api/expense/${user}?timestamp=${new Date().getTime()}`)
			.then((response) => {
				if (Array.isArray(response.data)) {
					setExpenses(response.data);
				} else {
					setExpenses([]);
				}
			})
			.catch((error) => console.log(error));
	}, []);
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
	const NoDataFound = () => {
		return (
			<div className="text-center text-xl font-semibold my-4">
				No data found
			</div>
		);
	};
	const [categoryData, setCategoryData] = useState([]);
	useEffect(() => {
		axios
			.get(`/api/category?timestamp=${new Date().getTime()}`)
			.then((response) => {
				setCategoryData(response.data);
			})
			.catch((error) => console.log(error));
	}, []);

	// Configuring the pie chart data
	const categoryMap = categoryData.reduce((map, category) => {
		map[category._id] = category.name;
		return map;
	}, {});

	const categoryTotals = (Array.isArray(expenses) ? expenses : []).reduce(
		(acc, expense) => {
			const { category_id, amount } = expense;
			const categoryName = categoryMap[category_id._id];
			if (acc[categoryName]) {
				acc[categoryName] += amount;
			} else {
				acc[categoryName] = amount;
			}
			return acc;
		},
		{}
	);

	const piedata = {
		labels: Object.keys(categoryTotals),
		datasets: [
			{
				label: "Expenses",
				data: Object.values(categoryTotals),
				backgroundColor: [
					"rgba(255, 99, 132, 0.9)",
					"rgba(54, 162, 235, 0.9)",
					"rgba(255, 206, 86, 0.9)",
					"rgba(75, 192, 192, 0.9)",
					"rgba(153, 102, 255, 0.9)",
					"rgba(255, 159, 64, 0.9)",
					"rgba(199, 199, 199, 0.9)",
					"rgba(83, 102, 255, 0.9)",
					"rgba(255, 99, 71, 0.9)",
					"rgba(144, 238, 144, 0.9)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
					"rgba(199, 199, 199, 1)",
					"rgba(83, 102, 255, 1)",
					"rgba(255, 99, 71, 1)",
					"rgba(144, 238, 144, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	const groupedByCategory = (Array.isArray(expenses) ? expenses : []).reduce(
		(acc, expense) => {
			const date = new Date(expense.expense_date);
			const month = `${date.getFullYear()}-${String(
				date.getMonth() + 1
			).padStart(2, "0")}`;
			const category = expense.category_id.name;

			if (!acc[category]) {
				acc[category] = {};
			}

			if (!acc[category][month]) {
				acc[category][month] = 0;
			}

			acc[category][month] += expense.amount;
			return acc;
		},
		{}
	);

	// Get all months
	const allMonths = [
		...new Set(
			Object.values(groupedByCategory)
				.flatMap((categoryData) => Object.keys(categoryData))
				.sort()
		),
	];

	// Create datasets
	const datasets = Object.entries(groupedByCategory).map(([category, data]) => {
		return {
			label: category,
			data: allMonths.map((month) => data[month] || 0), // Fill missing months with 0
			borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
				Math.random() * 255
			)}, ${Math.floor(Math.random() * 255)}, 1)`, // Random color
			backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
				Math.random() * 255
			)}, ${Math.floor(Math.random() * 255)}, 0.2)`, // Random transparent color
		};
	});

	const linedata = {
		labels: allMonths.map((month) => {
			const [year, monthNum] = month.split("-");
			const monthNames = [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
			];
			return `${monthNames[parseInt(monthNum, 10) - 1]} ${year}`;
		}),
		datasets,
	};

	return (
		<>
			<div className="text-center text-2xl font-bold my-4">Expense Reports</div>
			{expenses.length === 0 ? (
				<div className="text-center text-xl font-semibold my-4">
					No data found
				</div>
			) : (
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
			)}
		</>
	);
};

export default Reports;
