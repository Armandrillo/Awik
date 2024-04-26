"use strict";

var dbConn = require("../../config/db.config");

var Employee = function Employee(account) {
  this.employeeId = account.empId;
  this.accountId = account.accountId;
  this.position = account.position;
};

Employee.findAll = function (result) {
  dbConn.query("Select * from employee", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      console.log("employees: ", res);
      result(null, res);
    }
  });
};

Employee.findById = function (id, result) {
  dbConn.query(
    "Select * from employee where employeeId = ? ",
    id,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Employee;
