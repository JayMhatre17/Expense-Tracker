import {
  Avatar,
  Dropdown,
  DropdownItem,
  Navbar,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "../store/UserSlice";
import Contact from "../pages/Contact";
import { useState } from "react";
const Navigationbar = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    axios
      .get("/api/auth/logout")
      .then((response) => {
        if (!response) {
          console.log("Something went wrong");
        } else {
          dispatch(logout());
          toast.success("Logged out successfully");
          window.location.reload();
        }
      })
      .catch((error) => console.error(error));
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Contact isOpen={isOpen} setIsOpen={setIsOpen} />
      <Navbar className="bg-blue-950 text-white" fluid>
        <Link to="/" className="flex items-center gap-2">
          <img src="/public/logo_icon.png" width={"40px"} />
          <span className="hover:text-gray-500 text-xl">Expense Tracker</span>
        </Link>
        <div className="flex md:order-2">
          {user === null ? (
            <Link className="hover:text-gray-500 text-xl" to="/login">
              Login
            </Link>
          ) : (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  className="mr-3"
                  rounded
                />
              }
            >
              <DropdownItem>Your Profile</DropdownItem>
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </Dropdown>
          )}
          <NavbarToggle />
        </div>
        <NavbarCollapse className="">
          <Link className="hover:text-gray-500 text-xl" to="/">
            Dashboard
          </Link>
          <Link className="hover:text-gray-500 text-xl" to="/addexpense">
            Add Expense
          </Link>

          <Link className="hover:text-gray-500 text-xl" to="/report">
            Reports
          </Link>
          <Link
            onClick={() => setIsOpen(true)}
            className="hover:text-gray-500 text-xl"
          >
            Contact
          </Link>
        </NavbarCollapse>
      </Navbar>
    </>
  );
};

export default Navigationbar;
