module.exports = function (app) {
  var controller = app.controllers.mecanica;

  app.get("/mecanicas", controller.listaTodos);
  app.post("/mecanicas/", controller.salvaMecanica);  
  app.get("/mecanicas/:id", controller.obtemMecanica);
  app.delete("/mecanicas/:id", controller.removeMecanica);
};
