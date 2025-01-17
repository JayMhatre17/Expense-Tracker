import React from "react";
import Greenting from "../components/Greenting";

import ExpenseList from "../components/ExpenseList";

const Dashboard = () => {
  return (
    <>
      <div className="mt-2 p-6">
        <Greenting />
        <div className="flex flex-col items-center">
          <ExpenseList />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
