module.exports = function (app) {
    var controller = app.controllers.cidade;
  
    app.get("/cidades", controller.listarTodos);
    app.post("/cidades/", controller.salvar);
    app.get("/cidades/:id", controller.obterPorId);
    app.delete("/cidades/:id", controller.remover);
  };
  