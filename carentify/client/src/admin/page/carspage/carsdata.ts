import axios, { AxiosError } from "axios";

export type Vehicle = {
  carId: number;
  carType: "Sedan" | "Van";
  driverId: number;
  plateNo: string;
  brand: string;
  color: string;
  vehiclePax: number;
};

// Existing fetchCars function
export const fetchCars = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get("http://localhost:3000/api/cars", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data && Array.isArray(response.data.data)) {
    return response.data.data;
  } else {
    console.error("Fetched data is not an array:", response.data);
    throw new Error("Fetched data is not in the expected format");
  }
};

export type NewVehicleData = Omit<Vehicle, "carId">; // Exclude 'id' for new car submissions

// Function to add a new car
export const addNewCar = async (carData: NewVehicleData) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      "http://localhost:3000/api/cars",
      carData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Now TypeScript knows error is an AxiosError, which includes the response property.
      console.error(
        "Error adding new car:",
        error.response ? error.response.data : error.message
      );
    } else {
      // If it's not an AxiosError, it could be some other error (like a network error, etc.)
      console.error("An unexpected error occurred:", error);
    }
    throw new Error("Error adding new car");
  }
};

export const editCar = async (carId: number, carData: Partial<Vehicle>) => {
  const token = localStorage.getItem("token");
  return axios.put(`http://localhost:3000/api/cars/${carId}`, carData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
