const mongoose = require("mongoose");

module.exports = () => {
  const AderecoSchema = mongoose.Schema(
    {
      nome: { type: String, required: true, unique: true },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("Adereco", AderecoSchema);
};
