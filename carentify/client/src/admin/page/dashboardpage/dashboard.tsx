// DashboardPage.tsx
import React from 'react';

function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example summary cards */}
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-xl">123</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Customers</h3>
          <p className="text-xl">456</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Pending Orders</h3>
          <p className="text-xl">78</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
