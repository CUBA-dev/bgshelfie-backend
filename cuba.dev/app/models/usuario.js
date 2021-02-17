const mongoose = require("mongoose");

module.exports = () => {
  const UsuarioSchema = mongoose.Schema(
    {
      nome: { type: String, required: true, unique: false },
      apelido: { type: String, required: false, unique: false },
      email: { type: String, required: true, unique: true },
      cidade: { type: String, required: false, unique: false },
      telefone: { type: String, required: false, unique: true },
      dataNascimento: { type: Date, required: false, unique: true },

    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("Usuario", UsuarioSchema);
};