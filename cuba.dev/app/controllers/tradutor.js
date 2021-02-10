var mongoose = require("mongoose");

module.exports = function (app) {
  var Tradutor = app.models.tradutor;
  var controller = {};

  controller.listarTodos = function (req, res) {
    Tradutor.find()
      .exec()
      .then(
        function (tradutor) {
          res.json(tradutor);
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
      Tradutor.findById(_id)
        .exec()
        .then(
          function (tradutor) {
            !tradutor
              ? res.status(404).json("Tradutor não encontrado")
              : res.json(tradutor);
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
      Tradutor.deleteOne({ _id: _id })
        .exec()
        .then(
          function () {
            res.json("Tradutor removido");
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
        Tradutor.findByIdAndUpdate(_id, req.body)
          .exec()
          .then(
            function (tradutor) {
              res.json(tradutor);
            },
            function (erro) {
              console.error(erro);
              res.status(500).json(erro);
            }
          );
      } else {
        res.status(404).json("Valor de id não é válido");
      }
    } else {
      Tradutor.create(req.body)
        .then(
          function (tradutor) {
            res.status(201).json(tradutor);
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
