import React from "react";
import axios from "axios";

interface CreateDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDriverCreated: () => void;
}

const CreateDriverModal: React.FC<CreateDriverModalProps> = ({
  isOpen,
  onClose,
  onDriverCreated,
}) => {
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData(e.currentTarget);
    const driverData = JSON.stringify(Object.fromEntries(formData));

    try {
      await axios.post("http://localhost:3000/api/drivers", driverData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      onDriverCreated();
      onClose();
    } catch (error) {
      console.error("Failed to create driver", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Add New Driver
        </h3>
        <form onSubmit={handleSubmit} className="mt-2 space-y-3">
          {[
            "empId",
            "licenseNo",
            "firstName",
            "lastName",
            "email",
            "position",
          ].map((name, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700">
                {name.charAt(0).toUpperCase() +
                  name.slice(1).replace(/([A-Z])/g, " $1")}
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                name={name}
                placeholder={
                  name.charAt(0).toUpperCase() +
                  name.slice(1).replace(/([A-Z])/g, " $1")
                }
                required
              />
            </div>
          ))}
          <div className="mt-5 sm:mt-6">
            <button
              type="submit"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Driver
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

export default CreateDriverModal;
