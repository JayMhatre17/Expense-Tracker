import { Router } from "express";
import {
  createCategory,
  getCategory,
} from "../Controllers/CategoryController.js";

const categoryRouter = Router();

categoryRouter.post("/category/new", createCategory);
categoryRouter.get("/category", getCategory);
export default categoryRouter;
