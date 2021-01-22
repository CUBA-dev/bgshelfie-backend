var mongoose = require("mongoose");

module.exports = function (app) {
  var Adereco = app.models.adereco;
  var controller = {};

  controller.listarTodos = function (req, res) {
    Adereco.find()
      .exec()
      .then(
        function (adereco) {
          res.json(adereco);
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
      Adereco.findById(_id)
        .exec()
        .then(
          function (adereco) {
            !adereco
              ? res.status(404).json("Adereço não encontrado")
              : res.json(adereco);
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
      Adereco.deleteOne({ _id: _id })
        .exec()
        .then(
          function () {
            res.json("Adereço removido");
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
        Adereco.findByIdAndUpdate(_id, req.body)
          .exec()
          .then(
            function (adereco) {
              res.json(adereco);
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
      Adereco.create(req.body)
        .then(
          function (adereco) {
            res.status(201).json(adereco);
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
