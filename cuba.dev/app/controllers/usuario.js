var mongoose = require("mongoose");

module.exports = function (app) {
  var Usuario = app.models.usuario;
  var controller = {};

  controller.listarTodos = function (req, res) {
    Usuario.find()
      .exec()
      .then(
        function (usuario) {
          res.json(usuario);
        },
        function (erro) {
          console.error(erro);
          res.status(500).json(erro);
        }
      )
      .catch((err) => console.log(err));
  };

  controller.obterPorId = function (req, res) {
    var _id = req.params.id;

    if (mongoose.Types.ObjectId.isValid(_id)) {
        Usuario.findById(_id)
        .exec()
        .then(
          function (usuario) {
            !usuario
              ? res.status(404).json("Usuário não encontrado")
              : res.json(usuario);
          },
          function (erro) {
            console.log(erro);
            res.status(404).json(erro);
          }
        )
        .catch((err) => console.log(err));
    } else {
      res.status(404).json("Valor de id não é válido");
    }
  };

  controller.remover = function (req, res) {
    var _id = req.params.id;

    if (mongoose.Types.ObjectId.isValid(_id)) {
        Usuario.deleteOne({ _id: _id })
        .exec()
        .then(
          function () {
            res.json("Usuário removido");
          },
          function (erro) {
            return console.error(erro);
          }
        )
        .catch((err) => console.log(err));
    } else {
      res.status(404).json("Valor de id não é válido");
    }
  };

  controller.salvar = function (req, res) {
    var _id = req.body._id;
    if (_id) {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        Usuario.findByIdAndUpdate(_id, req.body)
          .exec()
          .then(
            function (usuario) {
              res.json(usuario);
            },
            function (erro) {
              console.error(erro);
              res.status(500).json(erro);
            }
          )
          .catch((err) => console.log(err));
      } else {
        res.status(404).json("Valor de id não é válido");
      }
    } else {
        Usuario.create(req.body)
        .then(
          function (usuario) {
            res.status(201).json(usuario);
          },
          function (erro) {
            console.log(erro);
            res.status(500).json(erro);
          }
        )
        .catch((err) => console.log(err));
    }
  };

  return controller;
};
