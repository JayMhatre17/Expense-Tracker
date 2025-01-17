import React, { useState } from "react";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
const Register = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		// console.log(value);
		setUser((prev) => ({ ...prev, [name]: value }));
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		const res = await axios.post("/api/auth/signup", user);
		if (!res) {
			toast.error("Something Went Wrong");
		} else {
			console.log(res);
			navigate("/");
			toast.success("Registered Successfully");
		}
	};
	return (
		<div className="flex justify-center mt-20">
			<Card className="w-96">
				<form className="flex flex-col gap-4" onSubmit={handleRegister}>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="username" value="Your name" />
						</div>
						<TextInput
							id="username"
							name="username"
							type="text"
							value={user.username}
							onChange={(e) => handleInputChange(e)}
							placeholder="Enter your full name"
							required
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="email1" value="Your email" />
						</div>
						<TextInput
							id="email1"
							name="email"
							type="email"
							value={user.email}
							onChange={(e) => handleInputChange(e)}
							placeholder="Your email"
							required
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="password1" value="Your password" />
						</div>
						<TextInput
							id="password1"
							name="password"
							type="password"
							value={user.password}
							onChange={(e) => handleInputChange(e)}
							placeholder="Your passwod"
							required
						/>
					</div>
					<Button type="submit">Sign Up</Button>
					<div className="text-center mt-4">
						<p>
							Already have an account?{" "}
							<Link to="/login" className="text-blue-500 hover:underline">
								Login here
							</Link>
						</p>
					</div>
				</form>
			</Card>
		</div>
	);
};

export default Register;
