var express = require("express");
var router = express.Router();
const ListMoto = require("../models/listMoto");

router.get("/getMoto", function (req, res) {
  ListMoto.find().then((data) => {
    if (data === null) {
      res.json({ result: false, error: "Problème" });
    } else {
      res.json({ listMoto: data });
    }
  });
});

router.post("/marques", function (req, res) {
  ListMoto.find({
    marque: req.body.marque,
    // cylindree: req.body.cylindree,
    // millesime: req.body.millesime,
  }).then((data) => {
    if (!data) {
      res.json({ result: false, error: "Problème" });
    } else {
      res.json({ listMarques: data });
      // console.log('DATA=>',data);
    }
  });
});
router.post("/findMyBike", function (req, res) {
  ListMoto.find({
    marque: req.body.marque,
    millesime: req.body.millesime,
    cylindree: req.body.cylindree,
  }).then((data) => {
    if (!data) {
      res.json({ result: false, error: "Problème" });
    } else {
      res.json({ maMoto: data });
    }
  });
});

router.post("/millesime", function (req, res) {
  ListMoto.find({
    marque: req.body.marque,
    millesime: 2016,
  }).then((data) => {
    console.log(data);
    if (data === null) {
      res.json({ result: false, error: "Problème" });
    } else {
      res.json(data);
    }
  });
});

router.post("/postMoto", function (req, res) {
  ListMoto.findOne({
    modele: req.body.modele,
    millesime: req.body.millesime,
  }).then((data) => {
    if (data) {
      res.json({ result: false, error: "Moto already exists" });
    } else {
      const newMotorcycle = new ListMoto({
        marque: req.body.marque,
        millesime: req.body.millesime,
        cylindree: req.body.cylindree,
        modele: req.body.modele,
      });
      newMotorcycle.save().then((newMotorcycle) => {
        res.json({
          result: true,
          modele: newMotorcycle.modele,
        });
      });
    }
  });
});

module.exports = router;
