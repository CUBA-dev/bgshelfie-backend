var mongoose = require("mongoose");

module.exports = function (app) {
  var Designer = app.models.designer;
  var controller = {};

  controller.listarTodos = function (req, res) {
    Designer.find()
      .exec()
      .then(
        function (designer) {
          res.json(designer);
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
      Designer.findById(_id)
        .exec()
        .then(
          function (designer) {
            !designer
              ? res.status(404).json("Designer não encontrado")
              : res.json(designer);
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
      Designer.deleteOne({ _id: _id })
        .exec()
        .then(
          function () {
            res.json("Designer removido");
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
        Designer.findByIdAndUpdate(_id, req.body)
          .exec()
          .then(
            function (designer) {
              res.json(designer);
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
      Designer.create(req.body)
        .then(
          function (designer) {
            res.status(201).json(designer);
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
