const mongoose = require("mongoose");

module.exports = () => {
  const DependenciaIdiomaSchema = mongoose.Schema(
    {
      nome: { type: String, required: true, unique: true },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("DependenciaIdioma", DependenciaIdiomaSchema);
};
