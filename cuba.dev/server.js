var http = require('http');
var app = require('./config/express')();
require("./config/database.js")(
  "mongodb+srv://cubadev:Uzvxk5QHH9Vp0JWU@cluster0-rfh4o.gcp.mongodb.net/test?retryWrites=true&w=majority"
);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express coffee Server escutando na porta '+ app.get('port'));
});


