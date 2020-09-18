var mongoose = require("mongoose");

module.exports = function (app) {
  var Dominio = app.models.dominio;
  var controller = {};

  controller.listarTodos = function (req, res) {
    Dominio.find()
      .exec()
      .then(
        function (dominio) {
          res.json(dominio);
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
      Dominio.findById(_id)
        .exec()
        .then(
          function (dominio) {
            (!dominio) ?
              res.status(404).json("Domínio não encontrado") :
              res.json(dominio);
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
      Dominio.deleteOne({ _id: _id })
        .exec()
        .then(
          function () {
            res.json("Domínio removido");
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
        Dominio.findByIdAndUpdate(_id, req.body)
          .exec()
          .then(
            function (dominio) {
              res.json(dominio);
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
      Dominio.create(req.body)
        .then(
          function (dominio) {
            res.status(201).json(dominio);
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