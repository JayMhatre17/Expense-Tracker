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
      <Footer container className="bg-slate-300 ">
        <div className="w-full text-center ">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <FooterBrand
              href="https://flowbite.com"
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Flowbite Logo"
              name="Flowbite"
            />
            <FooterLinkGroup>
              <FooterLink href="#" className="text-black">
                About
              </FooterLink>
              <FooterLink href="#" className="text-black">
                Privacy Policy
              </FooterLink>
              <FooterLink href="#" className="text-black">
                Licensing
              </FooterLink>
              <Link onClick={() => setIsOpen(true)} className="text-black">
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
