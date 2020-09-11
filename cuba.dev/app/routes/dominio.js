module.exports = function (app) {
  var controller = app.controllers.dominio;

  app.get("/dominios", controller.listarTodos);
  app.post("/dominios/", controller.salvar);
  app.get("/dominios/:id", controller.obterPorId);
  app.delete("/dominios/:id", controller.remover);
};
