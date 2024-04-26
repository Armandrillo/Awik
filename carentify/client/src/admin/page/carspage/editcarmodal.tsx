import React, { useEffect, useState } from "react";

interface Vehicle {
  carId: number;
  carType: "Sedan" | "Van";
  brand: string;
  vehiclePax: number;
  driverId: number;
  plateNo: string;
  color: string;
}

interface EditCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (carId: number, carData: Partial<Vehicle>) => void;
  initialCarData: Vehicle;
}

const EditCarModal = ({
  isOpen,
  onClose,
  onSave,
  initialCarData,
}: EditCarModalProps) => {
  const [carData, setCarData] = useState<Partial<Vehicle>>(initialCarData);

  useEffect(() => {
    setCarData(initialCarData);
  }, [initialCarData, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCarData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSave(initialCarData.carId, { ...carData }); // Ensure initialCarData.id is not undefined
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Edit Car</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col">
            <label htmlFor="carType">Car Type</label>
            <select
              id="carType"
              name="carType"
              value={carData.carType || ""}
              onChange={handleChange}
              className="border rounded p-2"
            >
              <option value="Sedan">Sedan</option>
              <option value="Van">Van</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={carData.brand || ""}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="vehiclePax">Vehicle Pax</label>
            <input
              type="number"
              id="vehiclePax"
              name="vehiclePax"
              value={carData.vehiclePax || 0}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="driverId">Driver ID</label>
            <input
              type="number"
              id="driverId"
              name="driverId"
              value={carData.driverId || 0}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="plateNo">Plate No</label>
            <input
              type="text"
              id="plateNo"
              name="plateNo"
              value={carData.plateNo || ""}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="color">Color</label>
            <input
              type="text"
              id="color"
              name="color"
              value={carData.color || ""}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCarModal;
