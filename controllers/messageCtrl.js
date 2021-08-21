const Message = require("../models/message");
const async = require("async");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const debug = require("debug")("messageCtrl");
const he = require("he");

// READ
// GET
exports.getMessages = function (req, res, next) {
  Message.find({})
    .populate("author")
    .exec(function (err, result) {
      if (err) {
        return next(err);
      }
      const messages = result.map((item) => {
        item.title = he.decode(item.title);
        item.text = he.decode(item.text);
        return item;
      });
      debug(messages);
      res.render("index", { messages });
    });
};

// Create
// GET
exports.getCreate = function (req, res, next) {
  Message.find({})
    .populate("author")
    .exec(function (err, result) {
      if (err) {
        return next(err);
      }

      res.render("index", {
        createMessage: true,
        messages: result,
      });
    });
};
// POST
exports.postCreate = [
  //Validation
  body("title", "The title is empty").trim().isLength({ min: 1 }).escape(),
  body("title", "The title is too long").isLength({ max: 120 }),
  body("text", "The message is too short").trim().isLength({ min: 2 }).escape(),
  function (req, res, next) {
    // Failed validation
    const errors = validationResult(req).array();
    if (!!errors.length) {
      return res.render("index", { createMessage: true, errors });
    }
    // Passed validation
    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      author: req.user,
    });

    message.save(function (err, results) {
      if (err) {
        next(err);
        res.render("index", {
          createMessage: true,
          errors: { msg: "Failed to save message." },
        });
        return;
      } else res.redirect("/");
    });
  },
];
