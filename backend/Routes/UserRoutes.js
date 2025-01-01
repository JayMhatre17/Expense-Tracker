import { Router } from "express";
import {
	checkUser,
	createUser,
	getUser,
	logout,
} from "../Controllers/UserController.js";

const router = Router();

router.post("/auth/signup", createUser);
router.post("/auth/login", checkUser);
router.get("/auth/logout", logout);
router.get("/auth/getuser/:id", getUser);
export default router;
