const express = require("express");
const router = express.Router();
const messageCtrl = require("../controllers/messageCtrl");
// READ MESSAGES
// GET
router.get("/", messageCtrl.getMessages);

// CREATE MESSAGES
// GET
router.get("/createMessage", messageCtrl.getCreate);
// POST
router.post("/createMessage", messageCtrl.postCreate);

module.exports = router;
