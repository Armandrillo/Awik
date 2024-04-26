import React, { useState } from "react";
import {
  OrderDetail,
  OrderReceipt,
  orderDetails as initialOrderDetails,
  orderReceipts as initialOrderReceipts,
} from "./ordersdata"; // Ensure correct import paths
import { OrderDetailModal } from "./orderdetailmodel";
import { OrderReceiptModal } from "./orderreceiptmodal";

const OrdersPage = () => {
  const [orderDetails, setOrderDetails] =
    useState<OrderDetail[]>(initialOrderDetails); // Use initialOrderDetails to initialize state
  const [selectedOrderDetail, setSelectedOrderDetail] =
    useState<OrderDetail | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  const [selectedOrderReceipt, setSelectedOrderReceipt] =
    useState<OrderReceipt | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState<boolean>(false);

  const openModalWithOrderDetail = (orderId: number) => {
    const detail = orderDetails.find((detail) => detail.orderId === orderId);
    setSelectedOrderDetail(detail || null);
    setIsDetailModalOpen(true);
  };

  const openModalWithReceiptDetail = (orderId: number) => {
    const receipt = initialOrderReceipts.find(
      (receipt: OrderReceipt) => receipt.orderDetail.orderId === orderId
    ); // Added type annotation
    setSelectedOrderReceipt(receipt || null);
    setIsReceiptModalOpen(true);
  };

  // Function to update order status
  const updateOrderStatus = (
    orderId: number,
    newStatus: "Incoming" | "Paid" | "Canceled" | "Refunded"
  ) => {
    const updatedOrders = orderDetails.map((order) =>
      order.orderId === orderId ? { ...order, status: newStatus } : order
    );
    setOrderDetails(updatedOrders);
  };

  // Function to render orders by status
  const renderOrdersByStatus = (
    status: "Incoming" | "Paid" | "Canceled" | "Refunded"
  ) => {
    const filteredOrders = orderDetails.filter(
      (order) => order.status === status
    );
    return (
      <div>
        <h3 className="text-xl font-semibold my-4">{status} Orders</h3>
        {filteredOrders.map((order) => (
          <div key={order.orderId} className="border p-4 rounded-lg">
            <p>Order ID: {order.orderId}</p>
            <p>
              Customer: {order.customer.firstName} {order.customer.lastName}
            </p>
            <p>Total: {order.total}</p>
            <button
              onClick={() => openModalWithOrderDetail(order.orderId)}
              className="text-indigo-600 hover:underline"
            >
              Edit Details
            </button>
            {["Paid", "Canceled"].includes(order.status) && (
              <button
                onClick={() => openModalWithReceiptDetail(order.orderId)}
                className="ml-4 text-green-600 hover:underline"
              >
                Receipt Details
              </button>
            )}
            <select
              onChange={(e) =>
                updateOrderStatus(
                  order.orderId,
                  e.target.value as
                    | "Incoming"
                    | "Paid"
                    | "Canceled"
                    | "Refunded"
                )
              }
              value={order.status}
              className="ml-4 border rounded px-2 py-1"
            >
              <option value="Incoming">Incoming</option>
              <option value="Paid">Paid</option>
              <option value="Canceled">Canceled</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Orders Dashboard</h2>
      {renderOrdersByStatus("Incoming")}
      {renderOrdersByStatus("Paid")}
      {renderOrdersByStatus("Canceled")}
      {renderOrdersByStatus("Refunded")}
      {isDetailModalOpen && selectedOrderDetail && (
        <OrderDetailModal
          orderDetail={selectedOrderDetail}
          onClose={() => setIsDetailModalOpen(false)}
        />
      )}
      {isReceiptModalOpen && selectedOrderReceipt && (
        <OrderReceiptModal
          orderReceipt={selectedOrderReceipt}
          onClose={() => setIsReceiptModalOpen(false)}
        />
      )}
    </div>
  );
};

export default OrdersPage;
