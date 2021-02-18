const mongoose = require("mongoose");

module.exports = () => {
  const UsuarioSchema = mongoose.Schema(
    {
      nomeCompleto: { type: String, required: true, unique: false },
      email: { type: String, required: true, unique: true },
      cidade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cidade",
      },
      senha:{ type: String, required: true, unique: true },
      telefone: { type: String, required: false, unique: true },
      dataNascimento: { type: Date, required: false, unique: true },
      jogosUsuario:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Jogo",
        }
      ]


    },
    {
      timestamps: true,
    }
  );

  /* TODO
    - IMAGEM
    - LISTA DOS GRUPOS
    - lista de grupos de compras em aberto
  */

  return mongoose.model("Usuario", UsuarioSchema);
};