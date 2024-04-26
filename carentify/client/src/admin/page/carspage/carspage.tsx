import React, { useState, useEffect } from "react";
import {
  fetchCars,
  addNewCar as addNewCarAPI,
  editCar as editCarAPI,
  Vehicle,
} from "./carsdata";
import NewCarModal from "./newcarmodal";
import EditCarModal from "./editcarmodal";

function CarsPage() {
  const [cars, setCars] = useState<Vehicle[]>([]);
  const [isNewCarModalOpen, setIsNewCarModalOpen] = useState(false);
  const [isEditCarModalOpen, setIsEditCarModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Vehicle | undefined>(undefined);

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      const carsData = await fetchCars(); // Assume fetchCars fetches the updated list
      setCars(carsData); // Update state with the newly fetched cars
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleSaveNewCar = async (carData: Omit<Vehicle, "carId">) => {
    await addNewCarAPI(carData);
    setIsNewCarModalOpen(false);
    await loadCars(); // Reload cars list
  };

  const handleSaveEditCar = async (
    carId: number,
    carData: Partial<Vehicle>
  ) => {
    setIsEditCarModalOpen(false);
    setEditingCar(undefined); // Reset editing state

    if (typeof carId === "undefined") {
      console.error("Car ID is undefined in handleSaveEditCar");
      return; // Early return if carId is undefined
    }

    try {
      await editCarAPI(carId, carData); // Attempt to update the car details
      console.log("Car updated successfully");
    } catch (error) {
      console.error("Failed to update car", error);
    } finally {
      await loadCars(); // Reload the car list
    }
  };

  const openAddNewCarModal = () => {
    setIsNewCarModalOpen(true);
  };

  const startEdit = (car: Vehicle) => {
    setEditingCar(car); // This should set editingCar, including its id
    setIsEditCarModalOpen(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Cars</h2>
      <button
        onClick={openAddNewCarModal}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-150 ease-in-out"
      >
        Add New Car
      </button>

      {isNewCarModalOpen && (
        <NewCarModal
          isOpen={isNewCarModalOpen}
          onClose={() => setIsNewCarModalOpen(false)}
          onSave={handleSaveNewCar}
        />
      )}

      {isEditCarModalOpen && editingCar && (
        <EditCarModal
          isOpen={isEditCarModalOpen}
          onClose={() => setIsEditCarModalOpen(false)}
          onSave={handleSaveEditCar}
          initialCarData={editingCar}
        />
      )}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">ID</th>
            <th className="border-b p-2">Type</th>
            <th className="border-b p-2">Brand</th>
            <th className="border-b p-2">Pax</th>
            <th className="border-b p-2">Driver ID</th>
            <th className="border-b p-2">Plate #</th>
            <th className="border-b p-2">Color</th>
            <th className="border-b p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={`${car.carId}-${car.plateNo}`}>
              <td className="p-2 border-b">{car.carId}</td>
              <td className="p-2 border-b">{car.carType}</td>
              <td className="p-2 border-b">{car.brand}</td>
              <td className="p-2 border-b">{car.vehiclePax}</td>
              <td className="p-2 border-b">{car.driverId}</td>
              <td className="p-2 border-b">{car.plateNo}</td>
              <td className="p-2 border-b">{car.color}</td>
              <td className="p-2 border-b">
                <button
                  onClick={() => startEdit(car)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CarsPage;
