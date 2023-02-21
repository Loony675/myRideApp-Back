var express = require("express");
var router = express.Router();
const ListMoto = require("../models/listMoto");

router.get("/getMoto", function (req, res) {
  ListMoto.find().then((data) => {
    if (data === null) {
      res.json({ result: false, error: "Problème" });
    } else {
      console.log(data);
      res.json({result:true, listMoto:data})
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
