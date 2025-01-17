import axios from "axios";
import { Modal, TextInput, Button } from "flowbite-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CustomCategory = ({ openModal, setOpenModal }) => {
  const [customCategory, setCustomCategory] = useState("");

  const handleChange = (event) => {
    setCustomCategory(event.target.value);
  };
  const handleSubmit = async () => {
    const res = await axios.post(
      `/api/category/new?timestamp=${new Date().getTime()}`,
      {
        name: customCategory,
      }
    );
    if (!res) {
      toast.error("Something Went Wrong");
    } else {
      toast.success("Category Added Successfully");
      setOpenModal(false);
    }
  };

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <div className="mb-2 block">
          <Modal.Header>Add Category</Modal.Header>
        </div>
        <Modal.Body>
          <TextInput
            id="customCategory"
            type="text"
            name="customCategory"
            value={customCategory}
            onChange={handleChange}
            placeholder="Enter Custom Category"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={handleSubmit}>
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomCategory;
