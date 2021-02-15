module.exports = function (app) {
  var controller = app.controllers.dependenciaIdioma;

  app.get("/dependenciasIdioma", controller.listarTodos);
  app.post("/dependenciasIdioma/", controller.salvar);
  app.get("/dependenciasIdioma/:id", controller.obterPorId);
  app.delete("/dependenciasIdioma/:id", controller.remover);
};
