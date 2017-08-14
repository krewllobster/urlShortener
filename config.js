const mongoClient = require('mongodb').MongoClient

mongoClient.connect('mongodb://api:api@ds111559.mlab.com:11559/urlshortener', (err, db) => {
  if (err) throw err

  db.collection('url').remove({})
  db.collection('counter').remove({})

  db.collection('url').find().toArray((err, data) => {
    if (err) throw err

    console.log(data)
  })

  db.collection('counters').find().toArray((err, result) => {
    console.log(result)
  })

  db.close()
})
