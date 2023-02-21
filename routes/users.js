var express = require("express");
var router = express.Router();
const User = require("../models/users");
const uid2 = require('uid2')
const bcrypt = require('bcrypt')

router.post("/signUp", function (req, res) {
  User.findOne({ email: req.body.email}).then((data) => {
    if (data) {
      res.json({ result: false, error: "User already exists" });
    } else {
      const newUser = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        username: req.body.username,
        token: uid2(32)
      });
      newUser.save().then((newUser) => {
          res.json({ result: true, token: newUser.token, username: newUser.username });
      });
    };
  });
});

module.exports = router;
