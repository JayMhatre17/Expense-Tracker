import Budget from "../Model/BudgetModal.js";
import Expense from "../Model/ExpenseModal.js";

export const getBudget = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const budget = await Budget.findOne({ user_id });
    if (!budget) {
      return res.status(400).json({ message: "No Such Data Found" });
    }

    const expenses = await Expense.find({ user_id });
    const totalExpenses = expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
    const currentBalance = budget.current_balence - totalExpenses;

    res.status(200).json({ ...budget._doc, current_balence: currentBalance });
  } catch (error) {
    next(error);
  }
};

export const addBudgetData = async (req, res, next) => {
  try {
    const { user_id, amount } = req.body;
    const existingBudget = await Budget.findOne({ user_id });
    if (!existingBudget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    existingBudget.amount = amount;
    existingBudget.current_balence += Number(amount);
    const response = await existingBudget.save();
    if (!response) {
      return res.status(400).json({ message: "Something Went Wrong" });
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const editBudgetData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount, current_balence } = req.body;
    const updatedBudget = await Budget.findByIdAndUpdate(
      id,
      { amount: amount, current_balence: current_balence },
      { new: true }
    );
    if (!updatedBudget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    res.status(200).json(updatedBudget);
  } catch (err) {
    next(err);
  }
};
