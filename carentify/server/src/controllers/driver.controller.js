"use strict";

const Driver = require("../models/driver.model");

exports.findAll = function (req, res) {
  Driver.findAll(function (err, drivers) {
    console.log("controller");
    if (err) {
      console.error("Error retrieving drivers:", err);
      return res.status(500).send({
        status: 500,
        message: "Error retrieving drivers",
      });
    }
    console.log("res", drivers);
    res.send({
      status: 200,
      message: "Drivers retrieved successfully",
      data: drivers,
    });
  });
};
