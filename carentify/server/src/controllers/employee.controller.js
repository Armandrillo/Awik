"use strict";
const Employee = require("../models/employee.model");

exports.findAll = function (req, res) {
  Employee.findAll(function (err, employees) {
    console.log("controller");
    if (err) {
      console.error("Error retrieving employees:", err);
      return res.status(500).send({
        status: 500,
        message: "Error retrieving employees",
      });
    }
    console.log("res", employees);
    res.send({
      status: 200,
      message: "Employees retrieved successfully",
      data: employees,
    });
  });
};

exports.findById = function (req, res) {
  Employee.findById(req.params.id, function (err, employee) {
    if (err) {
      console.error("Error retrieving employee:", err);
      return res.status(500).send({
        status: 500,
        message: "Error retrieving employee",
      });
    }
    console.log("res", employee);
    res.send({
      status: 200,
      message: "Employee retrieved successfully",
      data: employee,
    });
  });
};
