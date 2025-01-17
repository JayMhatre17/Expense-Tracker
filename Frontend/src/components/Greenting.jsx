import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Greenting = () => {
  const user = useSelector((state) => state.user.user);
  const [userdetails, setUserdetails] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/auth/getuser/${user}?timestamp=${new Date().getTime()}`)
      .then((response) => setUserdetails(response.data.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <h1 className="text-2xl mb-1">Welcome,</h1>
      <h3 className="text-xl font-bold mb-4">{userdetails.name || "User"}</h3>
    </div>
  );
};

export default Greenting;
