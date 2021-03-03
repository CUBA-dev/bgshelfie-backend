const mongoose = require("mongoose");

module.exports = () => {
  const TematicaSchema = mongoose.Schema(
    {
      nome: { type: String, required: true, unique: true },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("Tematica", TematicaSchema);
};
