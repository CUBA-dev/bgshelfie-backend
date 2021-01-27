var mongoose = require("mongoose");

module.exports = function (app) {
  var TipoJogo = app.models.tipoJogo;
  var controller = {};

  controller.listarTodos = function (req, res) {
    TipoJogo.find()
      .exec()
      .then(
        function (tipoJogo) {
          res.json(tipoJogo);
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
      TipoJogo.findById(_id)
        .exec()
        .then(
          function (tipoJogo) {
            (!tipoJogo) ?
              res.status(404).json("Registro não encontrado") :
              res.json(tipoJogo);
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
      TipoJogo.deleteOne({ _id: _id })
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
        TipoJogo.findByIdAndUpdate(_id, req.body)
          .exec()
          .then(
            function (tipoJogo) {
              res.json(tipoJogo);
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
      TipoJogo.create(req.body)
        .then(
          function (tipoJogo) {
            res.status(201).json(tipoJogo);
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