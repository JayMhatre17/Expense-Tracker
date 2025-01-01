import axios from "axios";
import { Button, Card, Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AddExpense = () => {
	const user = useSelector((state) => state.user.user);
	const [expenseData, setExpenseData] = useState({
		description: "",
		amount: "",
		category: "",
		user_id: user,
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setExpenseData((prevData) => ({ ...prevData, [name]: value }));
	};
	// const [category,setCategory] = useState([])
	// useEffect(()=>{
	//     axios.get('/api/category').then((response) =>setCategory(response.data)).catch((error) => console.log(error))
	// },[])
	const handleExpenseSubmit = async (event) => {
		event.preventDefault();
		const res = await axios.post(
			`/api/expense/new?timestamp=${new Date().getTime()}`,
			expenseData
		);
		if (!res) {
			console.log("Some thing went wrong  ");
		} else {
			console.log(res);
		}
	};
	return (
		<div className="flex justify-center mt-8">
			<Card className="w-96">
				<h3>Add new transaction</h3>
				<form className="flex flex-col gap-4" onSubmit={handleExpenseSubmit}>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="description" value="Description:" />
						</div>
						<TextInput
							id="description"
							type="text"
							name="description"
							value={expenseData.description}
							onChange={handleChange}
							placeholder=""
							required
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="number" value="Amount:" />
						</div>
						<TextInput
							id="number"
							type="number"
							name="amount"
							value={expenseData.amount}
							onChange={handleChange}
							placeholder="Your Passwod"
							required
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="type" value="Category:" />
						</div>
						<select
							id="type"
							name="category"
							value={expenseData.category}
							onChange={handleChange}
						>
							<option value="">Select Category</option>
							<option value="Food">Food</option>
							<option value="Transport">Transport</option>
							<option value="Shopping">Shopping</option>
							<option value="Utilities">Bills</option>
							<option value="Utilities">Entertainment</option>
							<option value="Other">Other</option>
							{/* {category.map((val,index)=>{
                                <option key={index} value={val.id}>{val.name}</option>
                            })} */}
						</select>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="date" value="Date:" />
						</div>
						<TextInput
							id="date"
							type="date"
							name="date"
							value={expenseData.date}
							onChange={handleChange}
							placeholder="Your Passwod"
							required
						/>
					</div>
					<Button type="submit">Add Expense</Button>
				</form>
			</Card>
		</div>
	);
};

export default AddExpense;
