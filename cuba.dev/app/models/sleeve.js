const mongoose = require("mongoose");

module.exports = () => {
  const SleeveSchema = mongoose.Schema(
    {
      nome: { type: String, required: true, unique: true },
      tamanho: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("Sleeve", SleeveSchema);
};
