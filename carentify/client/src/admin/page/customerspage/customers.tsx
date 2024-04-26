import React from 'react';

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

const customers: Customer[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com', phone: '098-765-4321' },
  { id: 3, name: 'Mike Ross', email: 'mike@example.com', phone: '456-789-0123' },
  { id: 4, name: 'Harvey Specter', email: 'harvey@example.com', phone: '678-901-2345' },
  { id: 5, name: 'Rachel Zane', email: 'rachel@example.com', phone: '234-567-8901' },
];

function CustomersPage() {
  const addNewCustomer = () => {
    alert('Add new customer functionality not implemented.');
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Customers</h2>
      <button
        onClick={addNewCustomer}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Add New Customer
      </button>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">ID</th>
            <th className="border-b p-2">Name</th>
            <th className="border-b p-2">Email</th>
            <th className="border-b p-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="p-2 border-b">{customer.id}</td>
              <td className="p-2 border-b">{customer.name}</td>
              <td className="p-2 border-b">{customer.email}</td>
              <td className="p-2 border-b">{customer.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomersPage;
