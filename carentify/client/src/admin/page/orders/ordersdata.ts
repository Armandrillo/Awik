export type Vehicle = {
  id: number;
  carType: "Sedan" | "Van";
  driverId: number;
  driverName: string;
  plateNo: string;
  brand: string;
  color: string;
  vehiclePax: number;
};

export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: number;
};

export type Package = {
  id: number;
  packageType: "Basic" | "Semi-Premium" | "Premium" | "Custom";
  rentalHrs: number;
  pax: number;
  destination: string;
  pickUpLocation: string;
  moreDetails: string;
};

export type OrderDetail = {
  orderId: number;
  car: Vehicle;
  customer: Customer;
  package: Package;
  total: number;
  status: "Incoming" | "Paid" | "Canceled" | "Refunded";
};

export type OrderReceipt = {
  receiptId: number;
  orderDetail: OrderDetail;
  receiptDate: string;
};

export type Account = {
  accountId: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type Employee = {
  empId: number;
  account: Account;
  position: string;
};

// Sample data
export const cars: Vehicle[] = [
  {
    id: 1,
    driverId: 101,
    driverName: "John Smith",
    plateNo: "AB123CD",
    carType: "Van",
    brand: "Toyota",
    color: "Red",
    vehiclePax: 5,
  },
  {
    id: 2,
    driverId: 102,
    driverName: "Doe Ray",
    plateNo: "EF456GH",
    carType: "Sedan",
    brand: "Honda",
    color: "Blue",
    vehiclePax: 4,
  },
  // Add more cars as needed
];

export const packages: Package[] = [
  {
    id: 1,
    packageType: "Basic",
    rentalHrs: 8,
    destination: "Manila",
    pax: 4,
    pickUpLocation: "NAIA Terminal 1",
    moreDetails: "Airport pick-up",
  },
  {
    id: 2,
    packageType: "Premium",
    rentalHrs: 5,
    destination: "Cebu",
    pax: 6,
    pickUpLocation: "Lapu - Lapu City",
    moreDetails: "Beside Sari-Sari Store",
  },
  {
    id: 5,
    packageType: "Custom",
    rentalHrs: 0,
    destination: "",
    pax: 0,
    pickUpLocation: "",
    moreDetails: "",
  },
];

export const customers: Customer[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    contactNumber: 1234567890,
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    contactNumber: 987654321,
  },
];
// Assuming orderDetails is derived or can be matched from orders and cars
export const orderDetails: OrderDetail[] = [
  {
    orderId: 1,
    car: cars[0],
    customer: customers[0],
    package: packages[0],
    total: 150.0,
    status: "Paid",
  },
  {
    orderId: 2,
    car: cars[1],
    customer: customers[1],
    package: packages[1],
    total: 200.0,
    status: "Incoming",
  },
];

export const orderReceipts: OrderReceipt[] = [
  {
    receiptId: 1,
    orderDetail: orderDetails[0],
    receiptDate: "Jan 01, 2023",
  },
  {
    receiptId: 2,
    orderDetail: orderDetails[1],
    receiptDate: "Feb 10, 2023",
  },
];
