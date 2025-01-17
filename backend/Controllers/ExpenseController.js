import Expense from "../Model/ExpenseModal.js";
import Budget from "../Model/BudgetModal.js";

export const createExpense = async (req, res, next) => {
	try {
		const { user_id, amount, category, description, date } = req.body;
		const newExpense = new Expense({
			user_id,
			amount,
			category_id: category,
			description,
			expense_date: date,
		});
		// const budget = await Budget.findOne({ user_id: user_id });

		// if (!budget) {
		// 	return res.status(400).json({ message: "Budget not found" });
		// }

		// if (budget.current_balance < amount) {
		// 	return res.status(400).json({ message: "Insufficient budget" });
		// }

		// budget.current_balance -= amount;

		// await budget.save();
		await newExpense
			.save()
			.then((expense) => {
				res.status(201).json(expense);
			})
			.catch((error) => next(error));
	} catch (error) {
		next(error);
	}
};

export const getExpense = async (req, res, next) => {
	try {
		const { id } = req.params;
		const expenses = await Expense.find({ user_id: id }).populate(
			"category_id",
			"name"
		);
		if (!expenses) {
			return res.status(400).send("Something Went Wrong");
		}
		if (expenses.length <= 0) {
			return res.status(200).json("No Such Data Found");
		}
		res.status(200).json(expenses);
	} catch (error) {
		next(error);
	}
};

export const editExpense = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { user_id, amount, category_id, description, date } = req.body;

		const existingExpense = await Expense.findById({ _id: id });
		if (!existingExpense) {
			return res.status(404).json({ message: "Expense not found" });
		}

		const editdata = await Expense.findByIdAndUpdate(
			{ _id: id },
			{ user_id, amount, category_id, description, expense_date: date },
			{ new: true }
		);
		if (editdata) {
			res.status(200).json({ message: "Expense Edited Successfully" });
		} else {
			res.status(400).json({ message: "Something Went Wrong" });
		}
	} catch (error) {
		next(error);
	}
};

export const deleteExpense = async (req, res, next) => {
	try {
		const { id } = req.params;
		const existingExpense = await Expense.findById(id);
		if (!existingExpense) {
			return res.status(404).json({ message: "Expense not found" });
		}

		const budget = await Budget.findOne({ user_id: existingExpense.user_id });
		if (!budget) {
			return res.status(400).json({ message: "Budget not found" });
		}

		budget.current_balence += existingExpense.amount;
		await budget.save();

		const deleteexpense = await Expense.deleteOne({ _id: id });
		if (deleteexpense.deletedCount > 0) {
			res.status(200).send({ message: "Deleted Successfully" });
		} else {
			res.status(400).send({ message: "Something went wrong" });
		}
	} catch (error) {
		next(error);
	}
};
