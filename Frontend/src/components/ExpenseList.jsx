import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
const ExpenseList = () => {
	const user = useSelector((state) => state.user.user);
	const [expenseData, setExpenseData] = useState([]);
	useEffect(() => {
		axios
			.get(`/api/expense/${user}?timestamp=${new Date().getTime()}`)
			.then((response) => setExpenseData(response.data))
			.catch((error) => console.log(error));
	}, []);
	console.log(expenseData);
	return (
		<section className="p-5 bg-white rounded-md shadow-md mx-auto mt-5 min-w-full">
			<div className="border-b border-gray-300 pb-4 mb-4 flex justify-between items-center">
				<h1 className="text-lg font-semibold">Expenses</h1>
				<span className="bg-gray-300 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
					0
				</span>
			</div>
			<ul className="space-y-4">
				<li className="flex items-center p-4 bg-gray-50 shadow-sm rounded-md border-l-4 border-blue-500 hover:bg-gray-100">
					<div className="flex-grow">
						<p className="font-medium text-base">Hi</p>
						<p className="text-sm text-gray-500">12:17:45 PM</p>
					</div>
					<CiEdit className="text-2xl text-blue-500 cursor-pointer" />
					<MdOutlineDeleteForever className="text-2xl text-red-500 cursor-pointer ml-3" />
				</li>
				<li className="flex items-center p-4 bg-gray-50 shadow-sm rounded-md border-l-4 border-blue-500 hover:bg-gray-100">
					<div className="flex-grow">
						<p className="font-medium text-base">Hi</p>
						<p className="text-sm text-gray-500">12:17:45 PM</p>
					</div>
					<CiEdit className="text-2xl text-blue-500 cursor-pointer" />
					<MdOutlineDeleteForever className="text-2xl text-red-500 cursor-pointer ml-3" />
				</li>
				<li className="flex items-center p-4 bg-gray-50 shadow-sm rounded-md border-l-4 border-blue-500 hover:bg-gray-100">
					<div className="flex-grow">
						<p className="font-medium text-base">Hi</p>
						<p className="text-sm text-gray-500">12:17:45 PM</p>
					</div>
					<CiEdit className="text-2xl text-blue-500 cursor-pointer" />
					<MdOutlineDeleteForever className="text-2xl text-red-500 cursor-pointer ml-3" />
				</li>
			</ul>
		</section>
	);
};

export default ExpenseList;
