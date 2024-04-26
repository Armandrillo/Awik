import React, { useState } from 'react';
import { Customer, Package, OrderDetail, packages, cars } from './ordersdata';

export const OrderDetailModal = ({ orderDetail, onClose }: { orderDetail: OrderDetail | null, onClose: () => void }) => {
  if (!orderDetail) return null;

  const [selectedCarId, setSelectedCarId] = useState<number>(orderDetail.car.id);
  const selectedCar = cars.find(car => car.id === selectedCarId) || cars[0];
  const [selectedPackageId, setSelectedPackageId] = useState<number>(orderDetail.package.id);
  const selectedPackage = packages.find(pack => pack.id === selectedPackageId) || packages[0];

  const [customerInfo, setCustomerInfo] = useState<Customer>(orderDetail.customer);
  const [packageInfo, setPackageInfo] = useState<Package>(orderDetail.package);

  const handleCarChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCarId(parseInt(e.target.value, 10));
  };

  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPackageId(parseInt(e.target.value, 10));
  };

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePackageInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPackageInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4 overflow-y-auto">
    <div className="bg-white p-6 rounded-lg space-y-6 w-full max-w-2xl overflow-y-auto" style={{ maxHeight: '90vh' }}>
      <h2 className='font-bold text-lg text-center'>Order Details</h2>
        <section>
          <h3 className='font-bold mb-2'>Customer Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold" htmlFor="firstName">First Name:</label>
              <input type="text" id="firstName" name="firstName" value={customerInfo.firstName} onChange={handleCustomerInfoChange} className="mt-1 p-2 w-full border rounded" />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="lastName">Last Name:</label>
              <input type="text" id="lastName" name="lastName" value={customerInfo.lastName} onChange={handleCustomerInfoChange} className="mt-1 p-2 w-full border rounded" />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="email">Email:</label>
              <input type="text" id="email" name="email" value={customerInfo.email} onChange={handleCustomerInfoChange} className="mt-1 p-2 w-full border rounded" />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="email">Contact #:</label>
              <input type="text" id="contact" name="contact" value={customerInfo.contactNumber} onChange={handleCustomerInfoChange} className="mt-1 p-2 w-full border rounded" />
            </div>
          </div>
        </section>
        <section>
          <h3 className='font-bold mb-2'>Car Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold" htmlFor="carSelect">Car:</label>
              <select id="carSelect" value={selectedCarId} onChange={handleCarChange} className="mt-1 p-2 w-full border rounded">
                {cars.map((car) => (
                  <option key={car.id} value={car.id}>{car.brand} {car.carType}</option>
                ))}
              </select>
            </div>
            <p>Driver Name: {selectedCar.driverName}</p>
            <p>Plate Number: {selectedCar.plateNo}</p>
            <p>Car Type: {selectedCar.carType}</p>
            <p>Car Brand: {selectedCar.brand}</p>
          </div>
        </section>
        <section>
          <h3 className='font-bold mb-2'>Package Information</h3>
          <div className="space-y-4">
            <div>
            <label className="block font-semibold" htmlFor="packageName">Package Type:</label>
            <select id="carSelect" value={selectedPackageId} onChange={handlePackageChange} className="mt-1 p-2 w-full border rounded">
               {packages.map((pack) => (
                 <option key={pack.id} value={pack.id}>{pack.packageType}</option>
               ))}
             </select>
            </div>
            <div>
              <label className="block font-semibold" htmlFor="destination">Destination:</label>
              <input id="destination" disabled={selectedPackage.packageType != 'Custom'} type="text" name="destination" value={selectedPackage.destination} onChange={handlePackageInfoChange} className="mt-1 p-2 w-full border rounded" />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="rentalHrs">Rental Hours:</label>
              <input id="rentalHrs" disabled={selectedPackage.packageType != 'Custom'} type="text" name="rentalHrs" value={String(selectedPackage.rentalHrs)} onChange={handlePackageInfoChange} className="mt-1 p-2 w-full border rounded" />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="pax">Passenger Capacity:</label>
              <input id="pax" disabled={selectedPackage.packageType != 'Custom'} type="text" name="pax" value={String(selectedPackage.pax)} onChange={handlePackageInfoChange} className="mt-1 p-2 w-full border rounded" />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="pickUpLocation">Pick-up Location:</label>
              <input id="pickUpLocation" disabled={selectedPackage.packageType != 'Custom'} type="text" name="pickUpLocation" value={selectedPackage.pickUpLocation} onChange={handlePackageInfoChange} className="mt-1 p-2 w-full border rounded" />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="moreDetails">More Details:</label>
              <input id="moreDetails" disabled={selectedPackage.packageType != 'Custom'} type="text" name="moreDetails" value={selectedPackage.moreDetails} onChange={handlePackageInfoChange} className="mt-1 p-2 w-full border rounded" />
            </div>
          </div>
        </section>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors">Close</button>
      </div>
    </div>
  );
};