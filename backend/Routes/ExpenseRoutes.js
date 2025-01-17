import { Router } from "express";
import {
  createExpense,
  deleteExpense,
  editExpense,
  getExpense,
} from "../Controllers/ExpenseController.js";

const expRouter = Router();

expRouter.post("/expense/new", createExpense);
expRouter.get("/expense/:id", getExpense);
expRouter.put("/expense/edit/:id", editExpense);
expRouter.delete("/expense/delete/:id", deleteExpense);
export default expRouter;
