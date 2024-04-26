"use strict";

const Vehicle = require("../models/vehicle.model");

exports.findAll = function (req, res) {
  Vehicle.findAll(function (err, vehicle) {
    console.log("controller");
    if (err) {
      console.error("Error retrieving vehicles:", err);
      return res.status(500).send({
        status: 500,
        message: "Error retrieving vehicles",
      });
    }
    console.log("res", vehicle);
    res.send({
      status: 200,
      message: "Vehicle retrieved successfully",
      data: vehicle,
    });
  });
};

exports.create = function (req, res) {
  const new_vehicle = new Vehicle(req.body);

  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({
      error: true,
      message: "Please provide all required field",
    });
  } else {
    Vehicle.create(new_vehicle, function (err, vehicle) {
      if (err) res.send(err);
      res.json({
        status: 200,
        message: "Vehicle added successfully",
        data: vehicle,
      });
    });
  }
};

// vehicle.controller.js
exports.update = function (req, res) {
  console.log("Update function called with ID:", req.params.id);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide all required fields" });
  }
  Vehicle.update(req.params.id, req.body, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    console.log("Vehicle updated successfully");
    res.json({
      success: true,
      message: "Vehicle updated successfully",
      data: result,
    });
  });
};
