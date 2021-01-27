var mongoose = require("mongoose");

module.exports = function (app) {
  var DependenciaIdioma = app.models.dependenciaIdioma;
  var controller = {};

  controller.listarTodos = function (req, res) {
    DependenciaIdioma.find()
      .exec()
      .then(
        function (dependenciaIdioma) {
          res.json(dependenciaIdioma);
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
      DependenciaIdioma.findById(_id)
        .exec()
        .then(
          function (dependenciaIdioma) {
            !dependenciaIdioma
              ? res.status(404).json("Registro não encontrado")
              : res.json(dependenciaIdioma);
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
      DependenciaIdioma.deleteOne({ _id: _id })
        .exec()
        .then(
          function () {
            res.json("Registro removido");
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
        DependenciaIdioma.findByIdAndUpdate(_id, req.body)
          .exec()
          .then(
            function (dependenciaIdioma) {
              res.json(dependenciaIdioma);
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
      DependenciaIdioma.create(req.body)
        .then(
          function (dependenciaIdioma) {
            res.status(201).json(dependenciaIdioma);
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
