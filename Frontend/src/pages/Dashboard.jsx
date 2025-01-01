import React from "react";
import Greenting from "../components/Greenting";
import Balance from "../components/Balance";
import ExpenseList from "../components/ExpenseList";

const Dashboard = () => {
	return (
		<>
			<div className="mt-2 p-6">
				<Greenting />
				<div className="flex flex-col items-center">
					<Balance />
					<ExpenseList />
				</div>
			</div>
		</>
	);
};

export default Dashboard;
