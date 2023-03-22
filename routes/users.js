var express = require("express");
var router = express.Router();
const User = require("../models/users");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

router.post("/signUp", function (req, res) {
  User.findOne({ email: req.body.email }).then((data) => {
    if (data) {
      res.json({ result: false, error: "User already exists" });
    } else {
      const newUser = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        username: req.body.username,
        token: uid2(32),
      });
      newUser.save().then((newUser) => {
        res.json({
          result: true,
          token: newUser.token,
          username: newUser.username,
        });
      });
    }
  });
});

router.post("/signIn", function (req, res) {
  User.findOne({ email: req.body.email }).then((data) => {
    if (bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, username: data.username, token: data.token });
    } else {
      res.json({ result: false, error: "User not found or wrong password" });
    }
  });
});

router.post('/findUserInfo', function (req, res) {
  User.findOne({token:req.body.token}).then((data) => {
    if (data) {
      res.json({result: true, data:data})

    } else {
      res.json({result: false, error:'No token'})
    }
  })
})

router.post("/postMyBike", function (req, res) {
  User.findOne({ token: req.body.token }).then((data) => {
    if (data) {
      if (req.body.marque) {
        User.findOneAndUpdate(
          { token: req.body.token },
          {
            moto: [
              {
                marque: req.body.marque,
                millesime: req.body.millesime,
                cylindree: req.body.cylindree,
                modele: req.body.modele,
              },
            ],
          }
        ).then();
      } else {
        res.json({ result: false, error: "marque not found" });
      }
      // if (req.body.millesime) {
      //   User.findOneAndUpdate({token:req.body.token}, {moto:[{millesime:req.body.millesime}]})
      //   .then();
      // } else {
      //   res.json({result:false, error:'millesime not found'})
      // }
      res.json({ result: true });
    } else {
      res.json({ result: false, error: "Token not found" });
    }
  });
});

router.post("/maMoto", function (req, res)  {
  User.findOne({token:req.body.token}).then((data)=> {
    if(data) {
      res.json({result:true, maMoto:data.moto})
    } else {
      res.json({result:false, error:'Token not found'})
    }
  })
})

module.exports = router;
