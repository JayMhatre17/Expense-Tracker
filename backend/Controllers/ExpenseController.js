import Expense from "../Model/ExpenseModal.js";
import Budget from "../Model/BudgetModal.js";
export const createExpense = async (req, res, next) => {
  try {
    const { user_id, amount, category_id, description } = req.body;
    const newExpense = new Expense({
      user_id,
      amount,
      category_id,
      description,
    });
    const budget = await Budget.findOne({ user_id });

    if (!budget) {
      return res.status(400).json({ message: "Budget not found" });
    }

    if (budget.current_balance < amount) {
      return res.status(400).json({ message: "Insufficient budget" });
    }

    budget.current_balance -= amount;
    await budget.save();
    newExpense
      .save()
      .then((expense) => res.status(201).json(expense))
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
};

export const getExpense = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const expenses = await Expense.find({ user_id }).populate(
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
    const { user_id, amount, category_id, description } = req.body;

    const existingExpense = await Expense.findById(id);
    if (!existingExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const budget = await Budget.findOne({ user_id });
    if (!budget) {
      return res.status(400).json({ message: "Budget not found" });
    }

    const amountDifference = amount - existingExpense.amount;
    if (budget.current_balence < amountDifference) {
      return res.status(400).json({ message: "Insufficient budget" });
    }

    budget.current_balence -= amountDifference;
    await budget.save();

    const editdata = await Expense.findByIdAndUpdate(
      id,
      { user_id, amount, category_id, description },
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
    const deleteexpense = await Expense.deleteOne({ _id: id });
    if (deleteexpense) {
      res.status(200).send({ message: "deleted Successfully" });
    } else {
      res.status(400).send({ message: "something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
