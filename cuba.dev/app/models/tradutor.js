const mongoose = require("mongoose");

module.exports = () => {
  const TradutorSchema = mongoose.Schema(
    {
      nome: { type: String, required: true, unique: true },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("Tradutor", TradutorSchema);
};
