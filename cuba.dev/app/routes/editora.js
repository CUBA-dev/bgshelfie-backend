module.exports = function (app) {
  var controller = app.controllers.editora;

  app.get("/editoras", controller.listarTodos);
  app.post("/editoras/", controller.salvar);
  app.get("/editoras/:id", controller.obterPorId);
  app.delete("/editoras/:id", controller.remover);
};
