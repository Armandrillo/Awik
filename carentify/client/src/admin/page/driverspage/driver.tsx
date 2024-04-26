import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateDriverModal from "./createdrivermodal";
import EditDriverModal from "./editdrivermodal";

interface Account {
  accountId: number;
  name: string; // Example field for account's name
}

interface Employee {
  empId: string;
  accountId: number; // Foreign key to Account
}

interface Driver {
  driverId: number;
  empId: string;
  licenseNo: string;
  email: string;
  position: string;
  account?: Account; // Adding Account to the Driver interface
}

const DriverPage = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentDriver, setCurrentDriver] = useState<Driver | null>(null);

  const loadDrivers = async () => {
    try {
      const driversResponse = await axios.get(
        "http://localhost:3000/api/driver",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      console.log("API response:", driversResponse.data); // Log the raw API response to diagnose the structure

      // Assuming the API returns an object with a 'drivers' property containing the array
      const driversArray = Array.isArray(driversResponse.data)
        ? driversResponse.data
        : driversResponse.data.drivers;

      if (!Array.isArray(driversArray)) {
        console.error("The fetched data is not an array:", driversArray);
        return; // Exit the function if driversArray is not an array
      }

      const enrichedDrivers = await Promise.all(
        driversArray.map(async (driver: Driver) => {
          if (!driver.empId) {
            console.error("empId is undefined for driver:", driver);
            return driver; // Return early if empId is missing
          }

          try {
            const employeeResponse = await axios.get(
              `http://localhost:3000/api/employees/${driver.empId}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );

            if (employeeResponse.data.accountId) {
              const accountResponse = await axios.get(
                `http://localhost:3000/api/account/${employeeResponse.data.accountId}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              return { ...driver, account: accountResponse.data };
            } else {
              console.error(
                "accountId is undefined for employee:",
                employeeResponse.data
              );
              return { ...driver };
            }
          } catch (error) {
            console.error(
              "Failed to fetch employee or account details:",
              error
            );
            return { ...driver };
          }
        })
      );

      setDrivers(enrichedDrivers.filter(Boolean));
    } catch (error) {
      console.error("Failed to fetch drivers:", error);
    }
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  const handleEditDriver = (driverId: number) => {
    const driver = drivers.find((d) => d.driverId === driverId);
    setCurrentDriver(driver || null);
    setIsEditModalOpen(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Driver Management</h2>
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Add New Driver
      </button>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Driver ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Employee ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Position
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {drivers.map((driver) => (
            <tr key={driver.driverId}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {driver.driverId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {driver.empId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {driver.account?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {driver.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {driver.position}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleEditDriver(driver.driverId)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isCreateModalOpen && (
        <CreateDriverModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onDriverCreated={loadDrivers}
        />
      )}
      {isEditModalOpen && currentDriver && (
        <EditDriverModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          driver={currentDriver}
          onDriverUpdated={loadDrivers}
        />
      )}
    </div>
  );
};

export default DriverPage;
