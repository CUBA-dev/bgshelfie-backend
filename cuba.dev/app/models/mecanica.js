const mongoose = require("mongoose");

module.exports = () => {
  const MecanicaSchema = mongoose.Schema(
    {
      nome: { type: String, required: true, unique: true },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("Mecanica", MecanicaSchema);
};
