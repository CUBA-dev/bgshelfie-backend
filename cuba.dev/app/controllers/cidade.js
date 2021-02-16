var mongoose = require("mongoose");

module.exports = function (app) {
  var Cidade = app.models.cidade;
  var controller = {};

  controller.listarTodos = function (req, res) {
    Cidade.find()
      .exec()
      .then(
        function (cidade) {
          res.json(cidade);
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
      Cidade.findById(_id)
        .exec()
        .then(
          function (cidade) {
            !cidade
              ? res.status(404).json("Cidade não encontrada")
              : res.json(cidade);
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
      Cidade.deleteOne({ _id: _id })
        .exec()
        .then(
          function () {
            res.json("Cidade removida");
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
        Cidade.findByIdAndUpdate(_id, req.body)
          .exec()
          .then(
            function (cidade) {
              res.json(cidade);
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
      Cidade.create(req.body)
        .then(
          function (cidade) {
            res.status(201).json(cidade);
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
