var http = require('http');
var app = require('./config/express')();
require("./config/database.js")(
  "URLMONGODB"
);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express coffee Server escutando na porta '+ app.get('port'));
});


