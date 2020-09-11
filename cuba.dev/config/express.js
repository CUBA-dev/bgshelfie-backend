var express = require("express");
var load = require("express-load");
var bodyParser = require("body-parser");
var home = require("../app/routes/home");

module.exports = function () {
  var app = express();

  //configuração de ambiente
  app.set("port", process.env.PORT || 3000);

  //middleware
  app.use(express.static("./public"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(require("method-override")());

  // abaixo do middleware express.static
  app.set("view engine", "ejs");
  app.set("views", "./app/views");

  load("models", { cwd: "app" }).then("controllers").then("routes").into(app);

  return app;
};
