const mongoose = require("mongoose");
const listMotoSchema = mongoose.Schema([
  {
    marque: String,
    millesime: String,
    cylindree: String,
    modele: String,
  },
]);

const ListMoto = mongoose.model("listMoto", listMotoSchema);

module.exports = ListMoto;
