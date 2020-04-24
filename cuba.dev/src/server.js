const express = require("express")
const app = express()
const path = require('path')
const bodyParser = require("body-parser")
require('dotenv/config')

const mongoClient = require("mongodb").MongoClient

mongoClient.connect(process.env.URI_BD, (erro, cliente) =>{
    if(erro)
        return console.log(erro)
    db = cliente.db('cubadev')
    app.listen(3000, function(){
        console.log("servidor rodando porta 3000")
        
    })
})

app.use(bodyParser.urlencoded({
    extended : true
}))

app.set('views', path.join(__dirname, 'views'))

app.get("/", (request, response) => {
    response.render('index.ejs')
})

app.post('/show', (request, response) => {
    db.collection('mecanica').insertOne(request.body, (err, result) =>{
        if(err)
            return console.log(err)
        console.log('mecanica salva no bd')
        response.redirect('/')
    })
})
