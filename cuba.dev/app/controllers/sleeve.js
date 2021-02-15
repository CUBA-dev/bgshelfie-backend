var mongoose = require("mongoose");

module.exports = function (app) {
  var Sleeve = app.models.sleeve;
  var controller = {};

  controller.listarTodos = function (req, res) {
    Sleeve.find()
      .exec()
      .then(
        function (sleeve) {
          res.json(sleeve);
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
      Sleeve.findById(_id)
        .exec()
        .then(
          function (sleeve) {
            !sleeve
              ? res.status(404).json("Sleeve não encontrado")
              : res.json(sleeve);
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
      Sleeve.deleteOne({ _id: _id })
        .exec()
        .then(
          function () {
            res.json("Sleeve removido");
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
        Sleeve.findByIdAndUpdate(_id, req.body)
          .exec()
          .then(
            function (sleeve) {
              res.json(sleeve);
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
      Sleeve.create(req.body)
        .then(
          function (sleeve) {
            res.status(201).json(sleeve);
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
