module.exports = function (app) {
  
    var controller = app.controllers.usuario;
  
    app.get("/usuarios", controller.listarTodos);
    app.post("/usuarios/", controller.salvar);  
    app.get("/usuarios/:id", controller.obterPorId);
    app.delete("/usuarios/:id", controller.remover);
  };