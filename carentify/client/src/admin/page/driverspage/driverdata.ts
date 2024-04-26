import axios, { AxiosError } from "axios";

// Existing fetchDrivers function
export const fetchDriver = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get("http://localhost:3000/api/drivers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

// Existing fetch specific employee id based on drivers id
export const fetchEmployee = async (empId: number) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `http://localhost:3000/api/employees/${empId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
};

// Existing fetch specific account id based on employee foreign key account id
export const fetchAccount = async (accountId: number) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `http://localhost:3000/api/account/${accountId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
};
