const express = require('express')
const helmet = require('helmet')
const mongoClient = require('mongodb').MongoClient
const url = require('url')
const app = express()
const api = require('./api/new.js')

app.use(helmet())

app.get('/new/:url', (req, res) => {
  mongoClient.connect('mongodb://api:api@ds111559.mlab.com:11559/urlshortener', (err, db) => {
    if (err) throw err

    api.checkNew(req.params.url)
      .then(data => console.log(data))
      .catch(err => console.log(err))


  })
})

app.listen(process.env.PORT || 27010, () => {
  console.log('node.js listening')
})
