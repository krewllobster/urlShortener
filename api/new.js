const mongoClient = require('mongodb').MongoClient
const url = require('url')
const r64 = require('radix-64')()
const mongoURL = 'mongodb://api:api@ds111559.mlab.com:11559/urlshortener'

const db = mongoClient.connect(mongoURL)

const checkNew = (url) => {
  const currVals = db.then(db => {
    return db.collection('url').find().toArray()
  }).catch(err => {console.log(err)})

  return currVals.then(array => {
    return array.filter(i => {return i.url === url}).length > 0
  }).catch(err => {console.log(err)})
}

const getShort = (url) => {
  return db
    .then(db => db.collection('url').find().toArray())
    .then(arr => arr.filter(i=>i.url===url)[0])
    .then(doc => {return {shortURL: 'theUrl/' + doc._id, url: url}})
    .catch(err => console.log(err))
}

const createShort = (url) => {

  const seq = db.then(db => {
    return db.collection('counters')
  }).then(collection => {
    return collection.findAndModify({_id: 'shorturl'}, [], {$inc: {sequence_value: 1}}, {new: true})
  }).then(res => {
    console.log(res)
    return res.value.sequence_value
  }).catch(err => {
    console.log(err)
  })

  return Promise.all([db, seq]).then(([db, seq]) => {
    return db.collection('url').insert({
      _id: r64.encodeInt(seq),
      url: url,
    })
  }).then(res => {
    console.log(res)
    return {shortUrl: 'theUrl/' + res.insertedIds, url: url}
  }).catch(err => {
    console.log(err)
  })
}

const getId = (id) => {
  return db
    .then(db => db.collection('url').find().toArray())
    .then(arr => arr.filter(i=>i._id===id)[0])
    .then(doc => doc ? doc.url : '/badshort')
    .catch(err => err)
}

module.exports = {
  checkNew: checkNew,
  getShort: getShort,
  createShort: createShort,
  getId: getId,
}
