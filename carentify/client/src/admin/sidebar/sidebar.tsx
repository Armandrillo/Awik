import React, { useState } from "react";

export const Sidebar = ({
  activeTab,
  handleTabChange,
}: {
  activeTab: string;
  handleTabChange: (tabName: string) => void;
}) => {
  return (
    <>
      <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-3/4 lg:w-80 sm:max-w-sx pt-6 pb-8 bg-gray-800 overflow-y-auto">
        <div className="flex w-full items-center px-6 pb-6 mb-6 lg:border-b border-gray-700">
          <span className="font-bold text-white uppercase">Carentify</span>
        </div>
        <div className="px-4 pb-6">
          <div className="mb-6">
            <h3 className="mb-3 text-xs uppercase text-gray-500 font-medium">
              Main
            </h3>
            {[
              "Dashboard",
              "Orders",
              "Customers",
              "Cars",
              "Packages",
              "Drivers",
              "Employees",
            ].map((tabName) => (
              <a
                key={tabName}
                onClick={() => handleTabChange(tabName)}
                className={`flex items-center pl-3 py-3 pr-4 text-gray-50 rounded cursor-pointer ${
                  activeTab === tabName ? "bg-indigo-500" : "hover:bg-gray-900"
                }`}
              >
                <span>{tabName}</span>
              </a>
            ))}
          </div>
          <div className="mb-6 pt-8">
            <h3 className="mb-3 text-xs uppercase text-gray-500 font-medium">
              Secondary
            </h3>
            {["Settings", "Log Out"].map((tabName) => (
              <a
                key={tabName}
                onClick={() => handleTabChange(tabName)}
                className={`flex items-center pl-3 py-3 pr-4 text-gray-50 rounded cursor-pointer ${
                  activeTab === tabName ? "bg-indigo-500" : "hover:bg-gray-900"
                }`}
              >
                <span>{tabName}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};
