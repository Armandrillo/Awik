import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardPage from "./dashboardpage/dashboard";
import OrdersPage from "./orders/orders";
import CustomersPage from "./customerspage/customers";
import CarsPage from "./carspage/carspage";
import SettingsPage from "./settingspage/settings";
import DriverPage from "../page/driverspage/driver";
import EmployeePage from "./employeespage/employees";
import { Sidebar } from "../sidebar/sidebar";

const AdminHomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Dashboard");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    if (tabName === "Log Out") {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardPage />;
      case "Orders":
        return <OrdersPage />;
      case "Customers":
        return <CustomersPage />;
      case "Cars":
        return <CarsPage />;
      case "Packages":
        return <h1>Package Page</h1>;
      case "Drivers":
        return <DriverPage />;
      case "Employees":
        return <EmployeePage />;
      case "Settings":
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <>
      <Sidebar activeTab={activeTab} handleTabChange={handleTabChange} />
      <div className="mx-auto lg:ml-80 p-8">{renderContent()}</div>
    </>
  );
};

export default AdminHomePage;
