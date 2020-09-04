require('dotenv/config')
const express = require("express")
const app = express()
const path = require("path")
const bodyParser = require("body-parser")

const ObjectId = require("mongodb").ObjectID
const MongoClient = require("mongodb").MongoClient

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect( process.env.URI_BD, { useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err)
  db = client.db("cubadev")

  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
  })
})

app.set("views", path.join(__dirname, "views"))

app
  .route("/mecanica") 
  .get(function (req, res) {
    const cursor = db.collection("mecanica").find()
    res.render("mecanica/index.ejs")
  })

  .post((req, res) => {
    db.collection("mecanica").save(req.body, (err, result) => {
      if (err) return console.log(err);
      console.log("Salvo no Banco de Dados");
      res.redirect("mecanica/show");
    });
  })

app.route("/mecanica/show").get((req, res) => {
  db.collection("mecanica")
    .find()
    .toArray((err, results) => {
      if (err) return console.log(err)
      res.render("mecanica/show.ejs", { mecanica: results })
    })
})

app
  .route("/mecanica/edit/:id")
  .get((req, res) => {
    var id = req.params.id

    db.collection("mecanica")
      .find(ObjectId(id))
      .toArray((err, result) => {
        if (err) return res.send(err)
        res.render("mecanica/edit.ejs", { mecanica: result })
      })
  })
  .post((req, res) => {
    var id = req.params.id
    var desc = req.body.desc

    db.collection("mecanica").updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          desc: desc,
        },
      },
      (err, result) => {
          console.log(err)
        if (err) return res.send(err)
        res.redirect("/mecanica/show")
        console.log("Atualizado no Banco de Dados")
      }
    )
  })

app.route("/mecanica/delete/:id").get((req, res) => {
  var id = req.params.id

  db.collection("mecanica").deleteOne({ _id: ObjectId(id) }, (err, result) => {
    if (err) return res.send(500, err)
    console.log("Deletado do Banco de Dados!")
    res.redirect("/mecanica/show")
  })
})

app
  .route("/dominio") 
  .get(function (req, res) {
    const cursor = db.collection("dominio").find()
    res.render("dominio/index.ejs")
  })

  .post((req, res) => {
    db.collection("dominio").save(req.body, (err, result) => {
      if (err) return console.log(err);
      console.log("Salvo no Banco de Dados");
      res.redirect("dominio/show");
    });
  })

app.route("/dominio/show").get((req, res) => {
  db.collection("dominio")
    .find()
    .toArray((err, results) => {
      if (err) return console.log(err)
      res.render("dominio/show.ejs", { dominio: results })
    })
})

app
  .route("/dominio/edit/:id")
  .get((req, res) => {
    var id = req.params.id

    db.collection("dominio")
      .find(ObjectId(id))
      .toArray((err, result) => {
        if (err) return res.send(err)
        res.render("dominio/edit.ejs", { dominio: result })
      })
  })
  .post((req, res) => {
    var id = req.params.id
    var desc = req.body.desc

    db.collection("dominio").updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          desc: desc,
        },
      },
      (err, result) => {
          console.log(err)
        if (err) return res.send(err)
        res.redirect("/dominio/show")
        console.log("Atualizado no Banco de Dados")
      }
    )
  })

app.route("/dominio/delete/:id").get((req, res) => {
  var id = req.params.id

  db.collection("dominio").deleteOne({ _id: ObjectId(id) }, (err, result) => {
    if (err) return res.send(500, err)
    console.log("Deletado do Banco de Dados!")
    res.redirect("/dominio/show")
  })
})