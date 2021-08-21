const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const userCtrl = require("../controllers/userCtrl");
const passport = require("passport");
require("passport-local");

// Sign-up
// GET
router.get("/signUp", userCtrl.getSignUp);
// POST
router.post("/signUp", userCtrl.postSignUp);

// Log-in
// GET
router.get("/logIn", userCtrl.getLogIn);
// POST
router.post("/logIn", userCtrl.postLogIn);

// Log-out
// GET
router.get("/logOut", userCtrl.getLogOut);
// POST
router.post("/logOut", userCtrl.postLogOut);
// Join the club
// GET
router.get("/join", userCtrl.getJoin);
// POST
router.post("/join", userCtrl.postJoin);
module.exports = router;
