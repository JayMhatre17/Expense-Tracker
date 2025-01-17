import React, { useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";
import { FaArrowDownLong } from "react-icons/fa6";
import { Card } from "flowbite-react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import AddIncome from "./AddIncome";
const Balance = ({ isEditModalOpen, totalExpenseAmount }) => {
	const user = useSelector((state) => state.user.user);
	const [openModal, setOpenModal] = useState(false);
	const [userData, setUserData] = useState(0);
	useEffect(() => {
		axios
			.get(`/api/budgetdata/${user}?timestamp=${new Date().getTime()}`)
			.then((response) => setUserData(response.data))
			.catch((error) => console.error(error));
	}, [openModal, isEditModalOpen]);

	return (
		<>
			<AddIncome
				openModal={openModal}
				setOpenModal={setOpenModal}
				budget_id={userData._id}
			/>
			<Card href="#" className="w-[70%]">
				<div className="flex justify-between">
					<div>
						<h2 className="text-xl font-semibold">Current Balance</h2>
						<p className="text-3xl">&#8377; {userData.current_balence || 0} </p>
					</div>
					<div>
						<button
							className="m-5 p-2 bg-blue-500 rounded text-white shadow-lg"
							onClick={() => setOpenModal(true)}
						>
							Add Income
						</button>
					</div>
				</div>
				<div className="flex justify-between">
					<div className="text-green-500">
						<p className="flex">
							<FaArrowUpLong className="mt-1" />
							<span className="ml-2">Income</span>
						</p>
						<p className="font-bold text-xl">&#8377; {userData.amount || 0}</p>
					</div>
					<div className="text-red-500">
						<p className="flex">
							<FaArrowDownLong className="mt-1" />{" "}
							<span className="ml-2">Total Expenses</span>
						</p>
						<p className="font-bold text-xl">
							&#8377; {totalExpenseAmount || 0}
						</p>
					</div>
				</div>
			</Card>
		</>
	);
};

export default Balance;
