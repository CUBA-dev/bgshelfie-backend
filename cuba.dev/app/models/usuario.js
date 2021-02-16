const mongoose = require("mongoose");

module.exports = () => {
  const UsuarioSchema = mongoose.Schema(
    {
      nome: {
         type: String, 
         required: true,
         unique: false, 
         validate:{
          notEmpty: {
            msg: 'Nome é de preenchimento obrigatório.'
          },
         },
        },
      apelido: { type: String, required: false, unique: false },
      email: { 
        type: String, 
        required: true, 
        unique: true,
        validate: {
          notEmpty: {
            msg: 'E-mail é de preenchimento obrigatório.'
          },
          isEmail: {
              msg: 'Digite um e-mail válido.'
          }
        } 
      },
      senha: { 
        type: String,
        required: true,
        validate:{
          notEmpty: {
            msg: 'Senha é de preenchimento obrigatório.'
          },
         },
       },
      cidade: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Cidade"
      },
      telefone: { type: String, required: false, unique: true, },
      dataNascimento: { type: Date, required: false, unique: false },

    },
    {
      timestamps: true,
    }
    /*TO DO

    - Imagem
    
    */
  );


  return mongoose.model("Usuario", UsuarioSchema);
};