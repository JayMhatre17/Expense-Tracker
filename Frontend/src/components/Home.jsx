import React from "react";
import Balance from "./Balance";
const Home = () => {
	return (
		<div
			className="min-h-screen flex flex-col justify-between bg-gray-100 p-6 bg-cover bg-center"
			style={{ backgroundImage: 'url("../../public/homebg.jpg")' }}
		>
			{/* Header Section */}
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold text-gray-800">Welcome!</h1>
			</div>

			{/* Balance Component */}
			<div className="flex justify-center items-center my-6">
				<Balance />
			</div>

			{/* Get Started Button */}
			<div className="flex justify-center">
				<button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
					Get Started
				</button>
			</div>
		</div>
	);
};

export default Home;
