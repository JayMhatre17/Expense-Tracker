import React, { useState } from "react";
import {
	Footer,
	FooterBrand,
	FooterCopyright,
	FooterDivider,
	FooterLink,
	FooterLinkGroup,
} from "flowbite-react";
import { Link } from "react-router-dom";
import Contact from "../pages/Contact";

const MyFooter = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<Contact isOpen={isOpen} setIsOpen={setIsOpen} />
			<Footer container className="bg-slate-300 mt-5">
				<div className="w-full text-center ">
					<div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
						<Link to="/" className="flex items-center gap-2">
							<img src="/public/logo_icon.png" width={"40px"} />
							<span className="text-black font-bold">Expense Tracker</span>
						</Link>
						<FooterLinkGroup className="flex justify-center gap-4">
							<Link to="/" className="text-black font-bold">
								Dashboard
							</Link>
							<Link className="text-black font-bold" to="/addexpense">
								Add Expense
							</Link>

							<Link to="/report" className="text-black font-bold">
								Reports
							</Link>
							<Link
								onClick={() => setIsOpen(true)}
								className="text-black font-bold"
							>
								Contact
							</Link>
						</FooterLinkGroup>
					</div>
					<FooterDivider />
					<FooterCopyright
						className="text-black"
						href="#"
						by="Expense Tracker"
						year={2024}
					/>
				</div>
			</Footer>
		</>
	);
};

export default MyFooter;
