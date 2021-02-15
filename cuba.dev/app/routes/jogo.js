module.exports = function (app) {
  var controller = app.controllers.jogo;

  app.get("/jogos", controller.listarTodos);
  app.post("/jogos/", controller.salvar);
  app.get("/jogos/:id", controller.obterPorId);
  app.delete("/jogos/:id", controller.remover);
};
