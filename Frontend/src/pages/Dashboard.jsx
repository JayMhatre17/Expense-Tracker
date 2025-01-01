import React from 'react';
import { Card } from "flowbite-react";
const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-1">Good Evening</h1>
      <h3 className="text-xl font-bold mb-4">username</h3>
      <div className="w-full">
        {/* Total Expenses */}
        {/* <div className="bg-blue-100  p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Expenses</h2>
          <p className="text-3xl mt-2">$1,200</p>
        </div> */}
        <Card href="#" className="max-w-m">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
          </p>
        </Card>

        {/* Recent Transactions */}
        <div className="bg-green-100 mt-4 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <ul className="mt-2 space-y-2">
            <li className="flex justify-between">
              <span>Groceries</span>
              <span>$50</span>
            </li>
            <li className="flex justify-between">
              <span>Transport</span>
              <span>$15</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
