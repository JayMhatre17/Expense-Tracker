import mongoose from "mongoose";
const expeseSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: { type: Number, required: true },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: { type: String, required: true },
  expense_date: { type: String, required: true },
});
const Expense = mongoose.model("Expense", expeseSchema);
export default Expense;
