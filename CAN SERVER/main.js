const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient

app.use(bodyParser.json());
var url = 'mongodb://localhost:27017/can';

app.post('/', function (req, res) {
    MongoClient.connect(url, function(err, db){
        insertNewUser(req.body.lat, req.body.long, req.body.name, db)
    })
    res.status(200)
    res.send(req.body)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function insertNewUser(lat, long, name, dbConnection){
    let user = {
        name:name,
        location:[lat, long]
    }

    dbConnection.collection("users").insertOne(user)

}