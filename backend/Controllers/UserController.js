import { generateToken } from "../auth/AuthToken.js";
import User from "../Model/UserModal.js";
import bcrypt from "bcrypt";
import Budget from "../Model/BudgetModal.js";
export const createUser = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;
		console.log(req.body);
		if (!username || !email || !password) {
			return res.status(400).json({ message: "Name and email are required" });
		}
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(password, salt, async (err, hash) => {
				const newUser = new User({
					name: username,
					email: email,
					password: hash,
				});
				const user = await newUser.save();
				if (user) {
					const newBudget = new Budget({
						user_id: user._id,
						current_balence: 0,
					});
					await newBudget.save();
					res.cookie("token", generateToken(user._id), { httpOnly: true });
					res.send({
						_id: user._id,
						name: user.name,
						email: user.email,
						current_balence: newBudget.current_balence,
					});
				}
			});
		});
	} catch (error) {
		next(error);
	}
};

export const checkUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		bcrypt.compare(password, user.password, (err, result) => {
			if (result) {
				res.cookie("token", generateToken(user._id), { httpOnly: true });
				res.status(200).json({ data: user._id });
			} else {
				next(err);
			}
		});
	} catch (error) {
		next(error);
	}
};

export const logout = async (req, res, next) => {
	try {
		res.clearCookie("token");
		res.status(200).json({ message: "Logout Successfull" });
	} catch (error) {
		next(error);
	}
};

export const getUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({ data: { name: user.name, email: user.email } });
	} catch (error) {
		next(error);
	}
};
