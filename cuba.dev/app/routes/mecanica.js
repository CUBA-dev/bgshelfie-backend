module.exports = function (app) {
  var controller = app.controllers.mecanica;

  app.get("/mecanicas", controller.listaTodos);
  app.get("/mecanicas/:id", controller.obtemMecanica);
};
