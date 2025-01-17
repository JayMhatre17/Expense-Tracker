import { Router } from "express";
import {
  addBudgetData,
  editBudgetData,
  getBudget,
} from "../Controllers/BudgetController.js";

const budgetRouter = Router();

budgetRouter.get("/budgetdata/:user_id", getBudget);
budgetRouter.put("/budget/add", addBudgetData);
budgetRouter.put("/budget/edit/:user_id", editBudgetData);

export default budgetRouter;
