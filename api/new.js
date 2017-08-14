const mongoClient = require('mongodb').MongoClient
const url = require('url')


const checkNew = (url) => {
  return new Promise((resolve, reject) => {
    var results
    mongoClient.connect('mongodb://api:api@ds111559.mlab.com:11559/urlshortener')
    .then(db => {
      return db.collection('url').find().toArray()
    })
    .catch(err => reject(err))
    .then(array => {
      results = array
      return array.filter(i => {return i.url === url}).length > 0
    })
    .then(urlExists => {
      if (urlExists) {
        resolve(results.find(i => i.url === url))
      } else {
        resolve('need to add to db')
      }
    })
  })
}

// const seq = db.collection('counters').findAndModify({
//   _id: 'shorturl'},
//   [],
//   {$inc: {sequence_value: 1}},
//   {new: true}
// )
//
// seq.then(data => {
//   db.collection('url').insert({
//     _id: data.value.sequence_value,
//     url: req.params.url
//   })
//     .then(nextData => {
//       console.log(req.params.url + ' stored as ' + nextData.insertedIds)
//       db.close()
//       res.end(req.params.url + ' stored as ' + nextData.insertedIds)
//     })
//     .catch(err => {
//       console.log(err)
//       db.close()
//       res.end(err)
//     })
// })

module.exports = {
  checkNew: checkNew,
}
