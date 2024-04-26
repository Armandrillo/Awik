"use strict";

var dbConn = require("../../config/db.config");

var Account = function Account(account) {
  this.accountId = account.accountId;
  this.email = account.email;
  this.firstName = account.firstName;
  this.lastName = account.lastName;
  this.password = account.password;
};

Account.create = function (newAccount, result) {
  dbConn.query("INSERT INTO account set ?", newAccount, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

const bcrypt = require("bcrypt");

// Refactor to use async/await for cleaner and more readable async code
Account.login = async function (req) {
  try {
    const results = await dbConn
      .promise()
      .query("SELECT * FROM account WHERE email = ?", [req.body.email]);

    if (results[0].length === 0) {
      throw new Error("Invalid credentials"); // No user found
    }

    const user = results[0][0];
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials"); // Password does not match
    }

    delete user.password; // Remove password for security
    return user; // Successfully logged in
  } catch (error) {
    console.log("Login error:", error);
    throw error; // Rethrow to be handled by the caller
  }
};

const saltRounds = 10; // The cost factor controls how much time is needed to calculate a single BCrypt hash. The higher the cost factor, the more hashing rounds are done.

Account.signup = function (req, resultCallback) {
  // Hash the password before saving to the database
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    if (err) {
      resultCallback(err, null);
    } else {
      dbConn.query(
        "INSERT INTO account (email, password, firstName, lastName) VALUES (?, ?, ?, ?)",
        [req.body.email, hash, req.body.firstName, req.body.lastName], // Store the hash instead of the plain password
        function (error, results) {
          if (error) {
            resultCallback(error, null);
          } else {
            // Returning the newly created account details (excluding the password)
            resultCallback(null, {
              id: results.insertId,
              email: req.body.email,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
            });
          }
        }
      );
    }
  });
};

Account.forgotpassword = async function (email) {
  // This needs to be a promise or use a callback properly
  const oldUser = await new Promise((resolve, reject) => {
    Account.findByEmail(email, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });

  if (!oldUser) {
    throw null;
  }

  const secret = process.env.JWT_SECRET + oldUser.password;
  const token = jwt.sign({ email: oldUser.email, id: oldUser.id }, secret, {
    expiresIn: "5m",
  });

  const link = `http://localhost:3000/reset-password/${oldUser.id}/${token}`;
  console.log("Reset password link:", link);

  return link;
};

Account.findAll = function (result) {
  dbConn.query("Select * from account", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("account : ", res);
      result(null, res);
    }
  });
};

Account.findById = function (id, result) {
  dbConn.query(
    "SELECT * FROM account WHERE accountId = ?",
    [id],
    function (err, res) {
      if (err) {
        console.log("Error while fetching account by id", err);
        result(err, null);
      } else {
        // Check if an account was found
        if (res.length) {
          console.log("Found account:", res[0]);
          result(null, res[0]); // Return the first account in the result set
        } else {
          console.log("No account found with the id", id);
          result("No account found with the given ID", null);
        }
      }
    }
  );
};

Account.update = function (id, account, result) {
  dbConn.query(
    "UPDATE account SET email=?,firstName=?,lastName=?,password=? WHERE accountId = ?",
    [account.email, account.firstName, account.lastName, account.password, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Account.delete = function (id, result) {
  dbConn.query(
    "DELETE FROM account WHERE accountId = ?",
    [id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Account;
