module.exports = function (app) {
  var controller = app.controllers.tipoJogo;

  app.get("/tiposJogo", controller.listarTodos);
  app.post("/tiposJogo/", controller.salvar);
  app.get("/tiposJogo/:id", controller.obterPorId);
  app.delete("/tiposJogo/:id", controller.remover);
};
