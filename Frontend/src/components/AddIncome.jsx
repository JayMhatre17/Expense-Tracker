import React, { useState } from "react";
import { Button, Card, Label, TextInput, Modal } from "flowbite-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddIncome = ({ setOpenModal, openModal }) => {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  const handleIncomeSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.put(
        `/api/budget/add?timestamp=${new Date().getTime()}`,
        { user_id: user, amount }
      );
      if (!res) {
        toast.error("Something went wrong");
        return res.status(400).json({ message: "Something went wrong" });
      }
      toast.success("Income Added Successfully");

      navigate("/");
      setOpenModal(false);
    } catch (error) {
      toast.error("Error adding income");
      console.error("Error adding income:", error);
      setOpenModal(false);
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <div className="flex justify-center mt-8 min-h-full">
        <Modal.Header>Add Income</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4" onSubmit={handleIncomeSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="amount" value="Amount:" />
              </div>
              <TextInput
                id="amount"
                type="number"
                value={amount}
                onChange={handleChange}
                placeholder="Enter amount"
                required
              />
            </div>
            <Button type="submit">Add Income</Button>
          </form>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default AddIncome;
