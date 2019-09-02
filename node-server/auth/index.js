const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const db = require("../db/connection");
const users = db.get("users");
users.createIndex("username", { unique: true });

// signup request body validation
const schema = Joi.object().keys({
  username: Joi.string()
    .regex(/(^[a-zA-Z0-9_]+$)/)
    .min(3)
    .max(10)
    .required(),
  password: Joi.string()
    .alphanum()
    .min(6)
    .max(10)
    .required(),
    userType: Joi.bool()
    .required()
});

// Routes
router.get("/", (req, res) => {
  res.json({
    message: "🔐 ✅"
  });
})

// POST to auth/signup ...
router.post("/signup", (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    users
      .findOne({
        username: req.body.username
      })
      .then(user => {
        // check if user laready exists
        if (user) {
          //  if user exists respond with an error
          const error = new Error("That username is taken");
          res.status(409)
          next(error);
        } else {
          //  hash the password
          bcrypt.hash(req.body.password.trim(), 12).then(hashedPassword => {
            //  insert new user
            const newUser = {
              username: req.body.username,
              password: hashedPassword,
              userType: req.body.userType
            };
            users.insert(newUser).then(insertedUser => {
              delete insertedUser.password;
              // {
              //     _id: insertedUser._id,
              //     username: insertedUser.username
              //   }
              res.json({ insertedUser });
            });
          });
        }
      });
  } else {
    res.status(422)
    next(result.error);
  }
});

module.exports = router;
