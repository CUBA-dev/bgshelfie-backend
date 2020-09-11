module.exports = function (app) {
  var controller = app.controllers.mecanica;

  app.get("/mecanicas", controller.listaTodos);
  app.post("/mecanicas/", controller.salvar);  
  app.get("/mecanicas/:id", controller.obterPorId);
  app.delete("/mecanicas/:id", controller.remover);
};