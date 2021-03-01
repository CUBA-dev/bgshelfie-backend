var mongoose = require("mongoose");

module.exports = function (app) {
  var Tematica = app.models.tematica;
  var controller = {};

  controller.listarTodos = function (req, res) {
    Tematica.find()
      .exec()
      .then(
        function (tematica) {
          res.json(tematica);
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
      Tematica.findById(_id)
        .exec()
        .then(
          function (tematica) {
            (!tematica) ?
              res.status(404).json("Temática não encontrado") :
              res.json(tematica);
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
        Tematica.deleteOne({ _id: _id })
        .exec()
        .then(
          function () {
            res.json("Tematica removido");
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
        Tematica.findByIdAndUpdate(_id, req.body)
          .exec()
          .then(
            function (tematica) {
              res.json(tematica);
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
        Tematica.create(req.body)
        .then(
          function (tematica) {
            res.status(201).json(tematica);
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