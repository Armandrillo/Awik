"use strict";

var dbConn = require("../../config/db.config");

var Driver = function Driver(account) {
  this.driverId = account.driverId;
  this.empId = account.empId;
  this.licenseNo = account.licenseNo;
};

// Function to fetch all driver
Driver.findAll = function (result) {
  dbConn.query("Select * from driver", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      console.log("drivers: ", res);
      result(null, res);
    }
  });
};

module.exports = Driver;
