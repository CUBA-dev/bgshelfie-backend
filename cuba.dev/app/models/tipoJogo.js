const mongoose = require("mongoose");

module.exports = () => {
  const TipoJogoSchema = mongoose.Schema(
    {
      nome: { type: String, required: true, unique: true },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("TipoJogo", TipoJogoSchema);
};
