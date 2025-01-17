import express from "express";
import { errorHandler } from "./error/errorHandler.js";
import cors from "cors";
import { connect } from "./db/db.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import router from "./Routes/UserRoutes.js";
import budgetRouter from "./Routes/BudgetRouter.js";
import categoryRouter from "./Routes/CategoryRoutes.js";
import expRouter from "./Routes/ExpenseRoutes.js";

dotenv.config();
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
connect();
const port = process.env.PORT || 3000;
app.use(errorHandler);
app.use("/api", router);
app.use("/api", expRouter);
app.use("/api", categoryRouter);
app.use("/api", budgetRouter);
app.listen(port, () => {
	console.log("Server is running");
});
