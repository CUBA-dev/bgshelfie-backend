const mongoose = require("mongoose");

module.exports = () => {
  const DesignerSchema = mongoose.Schema(
    {
      nome: { type: String, required: true, unique: true },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("Designer", DesignerSchema);
};
