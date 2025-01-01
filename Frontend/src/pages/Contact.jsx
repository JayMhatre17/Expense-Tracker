import React from "react";
import { Button, Drawer, Label, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { HiEnvelope } from "react-icons/hi2";
const Contact = ({ isOpen, setIsOpen }) => {
  const handleClose = () => setIsOpen(false);
  const [state, handleSubmit] = useForm("xkggvkbq");
  return (
    <>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="CONTACT US" titleIcon={HiEnvelope} />
        <Drawer.Items>
          <form onSubmit={handleSubmit}>
            <div className="mb-6 mt-3">
              <Label htmlFor="email" className="mb-2 block">
                Your email
              </Label>
              <TextInput
                id="email"
                name="email"
                placeholder="name@company.com"
                type="email"
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="subject" className="mb-2 block">
                Subject
              </Label>
              <TextInput
                id="subject"
                name="subject"
                placeholder="Let us know how we can help you"
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="message" className="mb-2 block">
                Your message
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message..."
                rows={4}
              />
            </div>
            <div className="mb-6">
              <Button
                type="submit"
                className="w-full"
                disabled={state.submitting}
              >
                Send message
              </Button>
            </div>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <a href="mailto:info@company.com" className="hover:underline">
                info@company.com
              </a>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <a href="tel:2124567890" className="hover:underline">
                212-456-7890
              </a>
            </p>
          </form>
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default Contact;
