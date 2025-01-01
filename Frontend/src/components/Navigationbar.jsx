import {
  Avatar,
  Dropdown,
  DropdownItem,
  FooterBrand,
  Navbar,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { Link } from "react-router-dom";

const Navigationbar = () => {
  return (
    <Navbar className="bg-blue-950 text-white" fluid rounded>
      <FooterBrand
        href="https://flowbite.com"
        src="https://flowbite.com/docs/images/logo.svg"
        alt="Flowbite Logo"
        name="Flowbite"
      />
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <DropdownItem>Your Profile</DropdownItem>
          <DropdownItem>Logout</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse className="">
        <Link className="hover:text-gray-500 text-xl" to="/">
          Home
        </Link>
        <Link className="hover:text-gray-500 text-xl" to="/dashboard">
          Dashboard
        </Link>
        <Link className="hover:text-gray-500 text-xl" to="/login">
          Login
        </Link>
        <Link className="hover:text-gray-500 text-xl" to="/report">
          Reports
        </Link>
        {/* <Link className="hover:text-gray-500 text-xl" to="/register" >Register</Link> */}
      </NavbarCollapse>
    </Navbar>
  );
};

export default Navigationbar;
