module.exports = function (app) {
  var controller = app.controllers.adereco;

  app.get("/aderecos", controller.listarTodos);
  app.post("/aderecos/", controller.salvar);
  app.get("/aderecos/:id", controller.obterPorId);
  app.delete("/aderecos/:id", controller.remover);
};
