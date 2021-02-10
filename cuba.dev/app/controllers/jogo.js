var mongoose = require("mongoose");

module.exports = function (app) {
  var Jogo = app.models.jogo;
  var controller = {};

  controller.listarTodos = function (req, res) {
    Jogo.find()
      .exec()
      .then(
        function (jogo) {
          res.json(jogo);
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
      Jogo.findById(_id)
        .exec()
        .then(
          function (jogo) {
            !jogo
              ? res.status(404).json("Jogo não encontrado")
              : res.json(jogo);
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
      Jogo.deleteOne({ _id: _id })
        .exec()
        .then(
          function () {
            res.json("Jogo removido");
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
        Jogo.findByIdAndUpdate(_id, req.body)
          .exec()
          .then(
            function (jogo) {
              res.json(jogo);
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
      Jogo.create(req.body)
        .then(
          function (jogo) {
            res.status(201).json(jogo);
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
