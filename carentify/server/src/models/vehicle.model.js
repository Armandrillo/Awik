"use strict";

var dbConn = require("../../config/db.config");

var Vehicle = function Vehicle(vehicle) {
  this.carId = vehicle.carId;
  this.carType = vehicle.carType;
  this.driverId = vehicle.driverId;
  this.plateNo = vehicle.plateNo;
  this.brand = vehicle.brand;
  this.color = vehicle.color;
  this.vehiclePax = vehicle.vehiclePax;
};

Vehicle.findAll = function (result) {
  dbConn.query("Select * from vehicle", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      console.log("vehicles: ", res);
      result(null, res);
    }
  });
};

Vehicle.create = function (newVehicle, result) {
  dbConn.query("INSERT INTO vehicle set ?", newVehicle, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

// Adjusted to match your database schema and column naming
Vehicle.update = function (id, vehicle, result) {
  if (typeof id === "undefined") {
    console.error("Vehicle ID is undefined");
    return result({ message: "Vehicle ID is undefined" }, null);
  }

  const query =
    "UPDATE vehicle SET carType=?, driverId=?, plateNo=?, brand=?, color=?, vehiclePax=? WHERE carId=?";
  const values = [
    vehicle.carType,
    vehicle.driverId,
    vehicle.plateNo,
    vehicle.brand,
    vehicle.color,
    vehicle.vehiclePax,
    id,
  ];

  dbConn.query(query, values, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log(`${res.affectedRows} vehicle(s) updated`);
      result(null, res);
    }
  });
};

module.exports = Vehicle;
