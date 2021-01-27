const mongoose = require("mongoose");

module.exports = () => {
  const EditoraSchema = mongoose.Schema(
    {
      nome: { type: String, required: true, unique: true },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("Editora", EditoraSchema);
};
