import React, { useState } from "react";

type Employees = {
  emp_id: number;
  first_name: string;
  last_name: string;
  position: string;
};

const initialEmployees: Employees[] = [
  { emp_id: 32, first_name: "Armand", last_name: "Joe", position: "Driver" },
  { emp_id: 56, first_name: "Jake", last_name: "Newman", position: "Manager" },
  {
    emp_id: 83,
    first_name: "Micheal",
    last_name: "George",
    position: "Accountant",
  },
];

function EmployeePage() {
  const [employees, setEmployees] = useState<Employees[]>(initialEmployees);

  const editEmployee = (id: number) => {
    alert(
      `Edit functionality not implemented. Supposed to edit employee with ID: ${id}`
    );
  };

  const addNewEmployee = () => {
    const newEmployee: Employees = {
      emp_id: employees.length + 20,
      first_name: "New First Name",
      last_name: "New Last Name",
      position: "New Position",
    };
    setEmployees([...employees, newEmployee]);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Employee</h2>
      <button
        onClick={addNewEmployee}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-150 ease-in-out"
      >
        Add New Employee
      </button>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Employee ID</th>
            <th className="border-b p-2">First Name</th>
            <th className="border-b p-2">Last Name</th>
            <th className="border-b p-2">Position</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.emp_id}>
              <td className="p-2 border-b">{employee.emp_id}</td>
              <td className="p-2 border-b">{employee.first_name}</td>
              <td className="p-2 border-b">{employee.last_name}</td>
              <td className="p-2 border-b">{employee.position}</td>
              <td className="p-2 border-b">
                <button
                  onClick={() => editEmployee(employee.emp_id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out"
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

export default EmployeePage;
