import React, { useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";
import { FaArrowDownLong } from "react-icons/fa6";
import { Card } from "flowbite-react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
const Balance = () => {
	const user = useSelector((state) => state.user.user);
	const [userData, setUserData] = useState(0);
	useEffect(() => {
		axios
			.get(`/api/budgetdata/${user}?timestamp=${new Date().getTime()}`)
			.then((response) => setUserData(response.data.current_balence))
			.catch((error) => console.error(error));
	}, []);
	return (
		<Card href="#" className="w-[70%]">
			<h2 className="text-xl font-semibold">Current Balance</h2>
			<p className="text-3xl">Rs. {userData} </p>
			<div className="flex justify-between">
				<div>
					<p className="flex">
						<FaArrowUpLong className="mt-1" />
						<span className="ml-2">Income</span>
					</p>
					<p className="font-bold text-xl">currency 0.0</p>
				</div>
				<div>
					<p className="flex">
						<FaArrowDownLong className="mt-1" />{" "}
						<span className="ml-2">Expenses</span>
					</p>
					<p className="font-bold text-xl">currency 0.0</p>
				</div>
			</div>
		</Card>
	);
};

export default Balance;
