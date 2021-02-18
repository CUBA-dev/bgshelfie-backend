const mongoose = require("mongoose");

module.exports = () => {
  const CidadeSchema = mongoose.Schema(
    {
      nome: { type: String, required: true, unique: true },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("Cidade", CidadeSchema);
};
