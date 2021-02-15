module.exports = function (app) {
  var controller = app.controllers.tradutor;

  app.get("/tradutores", controller.listarTodos);
  app.post("/tradutores/", controller.salvar);
  app.get("/tradutores/:id", controller.obterPorId);
  app.delete("/tradutores/:id", controller.remover);
};
