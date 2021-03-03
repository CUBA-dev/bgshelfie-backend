module.exports = function (app) {
    var controller = app.controllers.tematica;
  
    app.get("/tematica", controller.listarTodos);
    app.post("/tematica/", controller.salvar);
    app.get("/tematica/:id", controller.obterPorId);
    app.delete("/tematica/:id", controller.remover);
  };