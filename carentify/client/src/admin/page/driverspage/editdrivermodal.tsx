import React, { useState, useEffect } from "react";
import axios from "axios";

interface Account {
  accountId: number;
  name: string;
}

interface Driver {
  driverId: number;
  empId: string;
  licenseNo: string;
  email: string;
  position: string;
  // Ensure any directly used properties are compatible with input expectations
}

interface EditDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver;
  onDriverUpdated: () => void;
}

const EditDriverModal: React.FC<EditDriverModalProps> = ({
  isOpen,
  onClose,
  driver,
  onDriverUpdated,
}) => {
  // This example assumes you're only displaying the account name,
  // not using it as a form input value.
  const [accountName, setAccountName] = useState("");

  useEffect(() => {
    // This function fetches account name based on the driver's employee ID
    // Adjust your API paths as necessary.
    const fetchAccountName = async () => {
      const token = localStorage.getItem("token");
      try {
        const empResponse = await axios.get(
          `http://localhost:3000/api/employees/${driver.empId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const accountId = empResponse.data.data.accountId;
        const accResponse = await axios.get(
          `http://localhost:3000/api/account/${accountId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAccountName(accResponse.data.data.name);
      } catch (error) {
        console.error("Failed to fetch account name", error);
      }
    };

    if (driver) {
      fetchAccountName();
    }
  }, [driver]);

  if (!isOpen || !driver) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData(e.currentTarget);
    const updatedDriverData = JSON.stringify(Object.fromEntries(formData));

    try {
      await axios.put(
        `http://localhost:3000/api/drivers/${driver.driverId}`,
        updatedDriverData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      onDriverUpdated();
      onClose();
    } catch (error) {
      console.error("Failed to update driver", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Edit Driver
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">Account Name: {accountName}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          {/* Iterate over driver properties for form inputs, skipping account */}
          {["empId", "licenseNo", "email", "position"].map((name, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700">
                {name.charAt(0).toUpperCase() +
                  name.slice(1).replace(/([A-Z])/g, " $1")}
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                name={name}
                defaultValue={driver[name as keyof Driver]}
                required
              />
            </div>
          ))}
          <div className="mt-5 sm:mt-6">
            <button
              type="submit"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Driver
            </button>
          </div>
        </form>
        <div className="mt-5 sm:mt-6">
          <button
            onClick={onClose}
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDriverModal;
