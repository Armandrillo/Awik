"use strict";
const Account = require("../models/account.model");
const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key_here";

exports.findAll = function (req, res) {
  Account.findAll(function (err, account) {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({
      status: 200,
      message: "Account retrieved successfully",
      data: account,
    });
  });
};

exports.findById = function (req, res) {
  Account.findById(req.params.id, function (err, account) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({
      status: 200,
      message: "Account retrieved successfully",
      data: account,
    });
  });
};

exports.create = function (req, res) {
  const new_account = new Account(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required fields",
    });
  }
  Account.create(new_account, function (err, account) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({
      status: 200,
      message: "Account added successfully",
      data: account,
    });
  });
};

exports.login = async function (req, res) {
  try {
    const account = await Account.login(req);
    const token = jwt.sign(
      { id: account.id, email: account.email },
      secretKey,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      message: "Logged in successfully",
      token: token,
      data: account,
    });
  } catch (error) {
    res.status(401).send({ message: "Invalid credentials" });
  }
};

exports.signup = async function (req, res) {
  try {
    const account = await Account.signup(req);
    res.status(201).json({
      message: "Signup successful",
      account,
    });
  } catch (error) {
    res.status(500).send({ message: "Error signing up", error: error });
  }
};

exports.forgotpassword = async function (req, res) {
  const { email } = req.body;
  try {
    const result = await Account.forgotpassword(email);
    res.json({
      status: 200,
      message: "Reset password link sent.",
      data: result,
    });
  } catch (error) {
    if (error === null) {
      return res.status(404).json({ status: "User not found" });
    }
    res.status(500).send("Failed to process password reset.");
  }
};

exports.update = function (req, res) {
  Account.update(req.params.id, new Account(req.body), function (err, account) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({
      status: 200,
      message: "Account updated successfully",
      data: account,
    });
  });
};

exports.delete = function (req, res) {
  Account.delete(req.params.id, function (err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({
      status: 200,
      message: "Account deleted successfully",
    });
  });
};
