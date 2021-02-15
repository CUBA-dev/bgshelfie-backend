const mongoose = require("mongoose");

module.exports = () => {
  const JogoSchema = mongoose.Schema(
    {
      nome: { type: String, required: true, unique: true },
      descricao: { type: String },
      edicao: { type: String },
      youtubeVideo: [{ type: String }],
      anoLancamento: { type: Date, required: true },
      quantidadeJogadoresMin: {
        type: Number,
        required: true,
        validate: {
          validator: Number.isInteger,
          message: "{VALUE} is not an integer value",
        },
      },
      quantidadeJogadoresMax: {
        type: Number,
        validate: {
          validator: Number.isInteger,
          message: "{VALUE} is not an integer value",
        },
      },
      idadeRecomendada: {
        type: Number,
        validate: {
          validator: Number.isInteger,
          message: "{VALUE} is not an integer value",
        },
      },
      tempoMedioDuracaoMinutos: {
        type: Number,
        validate: {
          validator: Number.isInteger,
          message: "{VALUE} is not an integer value",
        },
      },
      dependenciaIdioma: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DependenciaIdioma",
      },
      sleeve: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sleeve",
        },
        {
          type: Number,
          validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not an integer value",
          },
        },
      ],
      tipoJogo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TipoJogo",
      },
      mecanicas: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Mecanica",
        },
      ],
      dominios: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Dominio",
        },
      ],
      editora: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Editora",
        },
      ],
      designer: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Designer",
        },
      ],
      tradutor: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Tradutor",
        },
      ],
/*
TO DO

- Imagem
- galeria de imagens
- expansões (cenário para RPG) -> CRUD de expansão
- arquivo de documentos de texto/planilha para armazenar manuais e outros itens (aprovados colaborativamente por um número x de usuários)
- arquivo de imagens
- temática - task alinne
*/
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("Jogo", JogoSchema);
};
