import React, { useEffect, useState } from "react";
import { Modal, Button, Card, Label, TextInput } from "flowbite-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const EditExpense = ({ isEditModalOpen, setIsEditModalOpen, editData }) => {
	const user = useSelector((state) => state.user.user);
	const [formData, setFormData] = useState({
		description: "",
		amount: "",
		category_id: "",
		expense_date: "",
		user_id: user,
	});
	const dateFn = (data) => {
		const date = new Date(data);
		return date.toLocaleDateString("en-CA");
	};

	useEffect(() => {
		if (editData) {
			setFormData({
				description: editData.description || "",
				amount: editData.amount || "",
				category_id: editData.category_id || "",
				expense_date: editData.expense_date || "",
				user_id: user,
			});
		}
	}, [editData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleEditExpenseSubmit = async (event) => {
		event.preventDefault();

		const res = await axios.put(`/api/expense/edit/${editData._id}`, formData);
		if (!res) {
			toast.error("Something Went Wrong");
		} else {
			toast.success("Expense Updated Successfully");
			setIsEditModalOpen(false);
		}
		// handleEditExpenseSubmit logic here
	};

	const [category, setCategory] = useState([]);
	useEffect(() => {
		axios
			.get(`/api/category?timestamp=${new Date().getTime()}`)
			.then((response) => setCategory(response.data))
			.catch((error) => console.log(error));
	}, []);
	return (
		<>
			<Modal show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
				<Modal.Body>
					<div className="space-y-6">
						<h3>Edit Your Expense</h3>
						<form
							className="flex flex-col gap-4"
							onSubmit={handleEditExpenseSubmit}
						>
							<div>
								<div className="mb-2 block">
									<Label htmlFor="description" value="Description:" />
								</div>
								<TextInput
									id="description"
									type="text"
									name="description"
									value={formData.description}
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
									value={formData.amount}
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
									value={formData.category}
									onChange={handleChange}
								>
									{category.map((val) => {
										return (
											<option key={val._id} value={val._id}>
												{val.name}
											</option>
										);
									})}
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
									value={dateFn(formData.expense_date)}
									onChange={handleChange}
									required
								/>
							</div>
							<Button type="submit">Add Expense</Button>
							<Button color="gray" onClick={() => setIsEditModalOpen(false)}>
								Cancel
							</Button>
						</form>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default EditExpense;
