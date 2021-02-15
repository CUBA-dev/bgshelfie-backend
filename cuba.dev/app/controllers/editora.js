var mongoose = require("mongoose");

module.exports = function (app) {
  var Editora = app.models.editora;
  var controller = {};

  controller.listarTodos = function (req, res) {
    Editora.find()
      .exec()
      .then(
        function (editora) {
          res.json(editora);
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
      Editora.findById(_id)
        .exec()
        .then(
          function (editora) {
            !editora
              ? res.status(404).json("Editora não encontrada")
              : res.json(editora);
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
      Editora.deleteOne({ _id: _id })
        .exec()
        .then(
          function () {
            res.json("Editora removida");
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
        Editora.findByIdAndUpdate(_id, req.body)
          .exec()
          .then(
            function (editora) {
              res.json(editora);
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
      Editora.create(req.body)
        .then(
          function (editora) {
            res.status(201).json(editora);
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
