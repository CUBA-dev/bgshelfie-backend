const mongoose = require("mongoose");

module.exports = () => {
  const MecanicaSchema = mongoose.Schema({
    nome: { type: String },
    createdAt: { type: Date, default: Date.now },
  });

  return mongoose.model("Mecanica", MecanicaSchema);
};
