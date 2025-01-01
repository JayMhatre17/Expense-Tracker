import Budget from "../Model/BudgetModal.js";

export const getBudget = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const budgets = await Budget.findOne({ user_id });
    if (!budgets) {
      return res.status(400).json({ message: "No Such Data Found" });
    }
    res.status(200).json(budgets);
  } catch (error) {
    next(error);
  }
};

export const addBudgetData = async (req, res, next) => {
  try {
    const { id, amount, current_balence } = req.body;
    const newBudget = new Budget({
      user_id: id,
      amount: amount,
      current_balence: current_balence,
    });
    const respose = await newBudget.save();
    if (!respose) {
      return res.status(400).json({ message: "Something Went Wrong" });
    }
    res.status(201).json(respose);
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
