const mongoose = require("mongoose");
const listMotoSchema = mongoose.Schema([
  {
    marque: String,
    millesime: Number,
    cylindree: Number,
    modele: String,
  },
]);

const ListMoto = mongoose.model("listMoto", listMotoSchema);

module.exports = ListMoto;
