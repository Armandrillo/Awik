import React from "react";
import { OrderReceipt } from "../orders/ordersdata"; // Ensure this path matches your project structure

export const OrderReceiptModal = ({
  orderReceipt,
  onClose,
}: {
  orderReceipt: OrderReceipt | null;
  onClose: () => void;
}) => {
  if (!orderReceipt) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4">
      <div
        className="bg-white p-6 rounded-lg space-y-6 w-full max-w-2xl overflow-auto"
        style={{ maxHeight: "90vh" }}
      >
        <h2 className="font-bold text-lg text-center">Receipt Details</h2>
        <section>
          <h3 className="font-bold mb-2">Customer Information</h3>
          <div className="space-y-2">
            <p>
              <strong>First Name:</strong>{" "}
              {orderReceipt.orderDetail.customer.firstName}
            </p>
            <p>
              <strong>Last Name:</strong>{" "}
              {orderReceipt.orderDetail.customer.lastName}
            </p>
            <p>
              <strong>Email:</strong> {orderReceipt.orderDetail.customer.email}
            </p>
            <p>
              <strong>Contact Number:</strong>{" "}
              {orderReceipt.orderDetail.customer.contactNumber}
            </p>
          </div>
        </section>
        <section>
          <h3 className="font-bold mb-2">Car Information</h3>
          <div className="space-y-2">
            <p>
              <strong>Car Type:</strong> {orderReceipt.orderDetail.car.carType}
            </p>
            <p>
              <strong>Driver Name:</strong>{" "}
              {orderReceipt.orderDetail.car.driverName}
            </p>
            <p>
              <strong>Plate No:</strong> {orderReceipt.orderDetail.car.plateNo}
            </p>
            <p>
              <strong>Brand:</strong> {orderReceipt.orderDetail.car.brand}
            </p>
            <p>
              <strong>Color:</strong> {orderReceipt.orderDetail.car.color}
            </p>
          </div>
        </section>
        <section>
          <h3 className="font-bold mb-2">Package Information</h3>
          <div className="space-y-2">
            <p>
              <strong>Package Type:</strong>{" "}
              {orderReceipt.orderDetail.package.packageType}
            </p>
            <p>
              <strong>Rental Hours:</strong>{" "}
              {orderReceipt.orderDetail.package.rentalHrs}
            </p>
            <p>
              <strong>Destination:</strong>{" "}
              {orderReceipt.orderDetail.package.destination}
            </p>
            <p>
              <strong>Passenger Capacity:</strong>{" "}
              {orderReceipt.orderDetail.package.pax}
            </p>
            <p>
              <strong>Pick Up Location:</strong>{" "}
              {orderReceipt.orderDetail.package.pickUpLocation}
            </p>
            <p>
              <strong>More Details:</strong>{" "}
              {orderReceipt.orderDetail.package.moreDetails}
            </p>
          </div>
        </section>
        <section>
          <h3 className="font-bold mb-2">Receipt Information</h3>
          <div className="space-y-2">
            <p>
              <strong>Reference #:</strong> {orderReceipt.receiptId}
            </p>
            <p>
              <strong>Total:</strong> {orderReceipt.orderDetail.total}
            </p>
            <p>
              <strong>Status:</strong> {orderReceipt.orderDetail.status}
            </p>
            <p>
              <strong>Receipt Date:</strong> {orderReceipt.receiptDate}
            </p>
          </div>
        </section>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};
