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
      );
  };

  controller.obtemMecanica = function (req, res) {};
  controller.removeMecanica = function (req, res) {};
  controller.salvaMecanica = function (req, res) {};


  return controller;
};
