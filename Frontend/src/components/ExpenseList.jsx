import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditExpense from "./EditExpense";
import Balence from "./Balance";

const ExpenseList = () => {
	const user = useSelector((state) => state.user.user);
	const [expenseData, setExpenseData] = useState(() => []);
	const [editData, setEditData] = useState([]);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`/api/expense/${user}?timestamp=${new Date().getTime()}`)
			.then((response) => {
				setExpenseData(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, [isEditModalOpen]);

	const handleDelete = (expenseId) => {
		axios
			.delete(`/api/expense/delete/${expenseId}`)
			.then(() => {
				const updatedExpenses = expenseData.filter((e) => e._id !== expenseId);
				setExpenseData(updatedExpenses);
				console.log("Deleted expense with id: ", expenseId);
			})
			.catch((error) => console.log(error));
	};

	const handleEdit = (expense) => {
		setEditData(expense);
		setIsEditModalOpen(true);
	};

	const totalExpenseAmount = Array.isArray(expenseData)
		? expenseData.reduce((total, expense) => total + expense.amount, 0)
		: 0;

	return (
		<>
			<EditExpense
				setIsEditModalOpen={setIsEditModalOpen}
				isEditModalOpen={isEditModalOpen}
				editData={editData}
			/>
			<Balence
				isEditModalOpen={isEditModalOpen}
				totalExpenseAmount={totalExpenseAmount}
			/>
			<section className="p-5 bg-white rounded-md shadow-md mx-auto mt-5 min-w-full">
				<div className="border-b border-gray-300 pb-4 mb-4 flex justify-between items-center">
					<h1 className="text-lg font-semibold">Recent Transactions</h1>
					<span className="bg-gray-300 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
						{expenseData.length}
					</span>
				</div>
				<ul className="space-y-4">
					{loading ? (
						<p className="text-gray-500 text-center">Loading...</p>
					) : Array.isArray(expenseData) && expenseData.length > 0 ? (
						expenseData.map((expense) => (
							<li
								key={expense._id}
								className="flex items-center p-4 bg-gray-50 shadow-sm rounded-md border-l-4 border-blue-500 hover:bg-gray-100"
							>
								<div className="flex-grow w-[30%]">
									<p className="font-medium text-base">{expense.description}</p>
									<p className="text-sm text-gray-500">
										{new Date(expense.expense_date).toLocaleDateString()}
									</p>
								</div>

								<div className="flex w-[30%]">
									<p className="font-medium text-base">
										{expense.category_id.name} -{" "}
										<span>&#8377; {expense.amount}</span>
									</p>
								</div>

								<div className="flex w-[30%] justify-end">
									<CiEdit
										className="text-2xl text-blue-500 cursor-pointer"
										onClick={() => handleEdit(expense)}
									/>
									<MdOutlineDeleteForever
										className="text-2xl text-red-500 cursor-pointer ml-3"
										onClick={() => handleDelete(expense._id)}
									/>
								</div>
							</li>
						))
					) : (
						<p className="text-gray-500 text-center">No transactions found.</p>
					)}
				</ul>
			</section>
		</>
	);
};

export default ExpenseList;
