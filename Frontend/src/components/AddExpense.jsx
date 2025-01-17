import axios from "axios";
import { Button, Card, Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomCategory from "./CustomCategory";

const AddExpense = () => {
	const navigate = useNavigate();
	const [openModal, setOpenModal] = useState(false);
	const user = useSelector((state) => state.user.user);
	const [expenseData, setExpenseData] = useState({
		description: "",
		amount: "",
		category: "",
		user_id: user,
		date: Date.now(),
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setExpenseData((prevData) => ({ ...prevData, [name]: value }));
	};
	const [category, setCategory] = useState([]);
	useEffect(() => {
		axios
			.get(`/api/category?timestamp=${new Date().getTime()}`)
			.then((response) => setCategory(response.data))
			.catch((error) => console.log(error));
	}, [openModal]);

	const handleExpenseSubmit = async (event) => {
		event.preventDefault();
		const res = await axios.post(
			`/api/expense/new?timestamp=${new Date().getTime()}`,
			expenseData
		);
		if (!res) {
			toast.error("Something Went Wrong");
			return res.status(400).json({ message: "Something Went Wrong" });
		}
		toast.success("Expense Added Successfully");
		navigate("/");
	};
	return (
		<>
			<CustomCategory setOpenModal={setOpenModal} openModal={openModal} />
			<div className="flex justify-center mt-8">
				<Card className="w-96">
					<h3>Add new Expense</h3>
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
								placeholder="Enter Description"
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
								placeholder="Enter Expense Amount"
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
								onChange={(e) => {
									if (e.target.value === "other") {
										setOpenModal(true);
									} else {
										handleChange(e);
									}
								}}
							>
								<option value="">Select Category</option>
								{category.map((val) => (
									<option key={val._id} value={val._id}>
										{val.name}
									</option>
								))}
								<option value="other">Other</option>
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
								required
							/>
						</div>
						<Button type="submit">Add Expense</Button>
					</form>
				</Card>
			</div>
		</>
	);
};

export default AddExpense;
