const async = require("async");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const debug = require("debug")("userCtrl");
require("passport-local");
require("dotenv");
/* 
This module controls the following user operations:
-Sign-Up;
-Log-in;
-Log-out;
-Join the club;
*/

// Sign-Up
//GET
exports.getSignUp = function (req, res) {
  res.render("signUp", { title: "Sign Up" });
};
//POST
exports.postSignUp = [
  // Validade and sanitize request
  body("firstname", "Must have mininum length")
    .trim()
    .isLength({ min: 1, max: 20 })
    .escape(),
  body("lastname", "Must have mininum length")
    .trim()
    .isLength({ min: 1, max: 20 })
    .escape(),
  body("username", " Email must be valid").trim().isEmail().escape(),
  body(
    "password",
    "Password must have 8 characters, containing uppercase and lowercase letters, a number and a symbol"
  )
    .trim()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
    })
    .escape(),
  body("confirmPassword", "Password confirmation failed")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }

      // Indicates the success of this synchronous custom validator
      return true;
    })
    .escape(),

  //Evaluate request
  function (req, res, next) {
    const errors = validationResult(req);
    // Resolve request
    if (!errors.isEmpty()) {
      res.send(errors);
    } else {
      bcrypt.hash(req.body.password, 10, (error, hashedPassword) => {
        const user = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          password: hashedPassword,
          memberStatus: "user",
        });
        if (error) {
          next(error);
        }
        user.save(function (err) {
          if (err) {
            next(err);
          } else {
            res.redirect("/");
          }
        });
      });
    }
  },
];

// Log In
// GET
exports.getLogIn = function (req, res, next) {
  res.render("logIn", { title: "Log In" });
};
// POST
exports.postLogIn = [
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/logIn",
  }),
];

// Log Out
// GET
exports.getLogOut = function (req, res, next) {
  res.send("getLogOut");
};

// POST
exports.postLogOut = function (req, res, next) {
  req.logout();
  res.redirect("/");
};

// Join the club
// GET
exports.getJoin = function (req, res, next) {
  res.render("join");
};
// POST
exports.postJoin = function (req, res, next) {
  if (req.body.memberCode == process.env.JOIN_PASS) {
    debug("req locals:" + req.user);
    User.findByIdAndUpdate(
      req.user,
      { memberStatus: "member" },
      {},
      function (err, result) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      }
    );
  } else res.render("join");
};
