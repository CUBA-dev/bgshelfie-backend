const mongoose = require("mongoose");

module.exports = () => {
  const DominioSchema = mongoose.Schema(
    {
      nome: { type: String, required: true, unique: true },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("Dominio", DominioSchema);
};
