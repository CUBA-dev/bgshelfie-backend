var mongoose = require("mongoose");
module.exports = function (uri) {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  mongoose.connection.on("connected", function () {
    console.log("Mongoose! Conectado");
  });
  mongoose.connection.on("disconnected", function () {
    console.log("Mongoose! Desconectado");
  });
  mongoose.connection.on("error", function (erro) {
    console.log("Mongoose! Erro na conexão: " + erro);
  });

  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log("Mongoose! Desconectado pelo término da aplicação");
      // 0 indica que a finalização ocorreu sem erros
      process.exit(0);
    });
  });
};
