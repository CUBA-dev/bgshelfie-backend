module.exports = function (app) {
  var controller = app.controllers.sleeve;

  app.get("/sleeves", controller.listarTodos);
  app.post("/sleeves/", controller.salvar);
  app.get("/sleeves/:id", controller.obterPorId);
  app.delete("/sleeves/:id", controller.remover);
};
