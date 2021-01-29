require('dotenv/config')

var http = require('http');
var app = require('./config/express')();
require("./config/database.js")(process.env.URI_BD);

http.createServer(app).listen(app.get('port'), function () {
    
    console.log('Express coffee Server escutando na porta '+ app.get('port'));
});


