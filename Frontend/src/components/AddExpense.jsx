import { Button, Card, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";

const AddExpense = () => {
  const [expenseData, setExpenseData] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpenseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleExpenseSubmit = (event) => {
    event.preventDefault();
    console.log(expenseData);
  };
  return (
    <div>
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
