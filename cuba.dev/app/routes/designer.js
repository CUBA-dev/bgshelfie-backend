module.exports = function (app) {
  var controller = app.controllers.designer;

  app.get("/designers", controller.listarTodos);
  app.post("/designers/", controller.salvar);
  app.get("/designers/:id", controller.obterPorId);
  app.delete("/designers/:id", controller.remover);
};
