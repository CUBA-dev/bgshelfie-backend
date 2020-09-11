var mongoose = require("mongoose");

module.exports = function (app) {
  var Mecanica = app.models.mecanica;
  var controller = {};

  controller.listaTodos = function (req, res) {
    Mecanica.find()
      .exec()
      .then(
        function (mecanica) {
          res.json(mecanica);
        },
        function (erro) {
          console.error(erro);
          res.status(500).json(erro);
        }
      )
      .catch((err) => console.log(err));
  };

  controller.obtemMecanica = function (req, res) {
    var _id = req.params.id;

    if (mongoose.Types.ObjectId.isValid(_id)) {
      Mecanica.findById(_id)
        .exec()
        .then(
          function (mecanica) {
            (!mecanica) ?
              res.status(404).json("Mecânica não encontrada") :
              res.json(mecanica);
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
  
  controller.removeMecanica = function (req, res) {
    var _id = req.params.id;

    if (mongoose.Types.ObjectId.isValid(_id)) {
      Mecanica.deleteOne({ _id: _id })
        .exec()
        .then(
          function () {
            res.json("Mecânica removida");
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
  controller.salvaMecanica = function (req, res) {
    var _id = req.body._id;
    if (_id) {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        Mecanica.findByIdAndUpdate(_id, req.body)
          .exec()
          .then(
            function (mecanica) {
              res.json(mecanica);
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
      Mecanica.create(req.body)
        .then(
          function (mecanica) {
            res.status(201).json(mecanica);
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
