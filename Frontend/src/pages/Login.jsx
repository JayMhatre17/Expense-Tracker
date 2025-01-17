import axios from "axios";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../store/UserSlice";
const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };
    try {
      const res = await axios.post("/api/auth/login", loginData);

      if (!res) {
        toast.error("Something Went Wrong");
      } else {
        dispatch(login(res.data.data));
        navigate("/");
        toast.success("Login Successfully");
      }
    } catch (err) {
      toast.error("Login failed");
    }
  };
  return (
    <div className="flex justify-center mt-24 mb-10">
      <Card className="w-96">
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Passwod"
              required
            />
          </div>
          <Button type="submit">Login</Button>
          <div className="text-center mt-4">
            <p>
              Not registered?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
