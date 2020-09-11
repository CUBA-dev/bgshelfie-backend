const mongoose = require("mongoose");

module.exports = () => {
  const DominioSchema = mongoose.Schema({
    nome: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
  });

  return mongoose.model("Dominio", DominioSchema);
};
