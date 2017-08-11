const express = require('express')
const helmet = require('helmet')
const url = require('url')
const app = express()
const retObj = {
  unix: null,
  natural: null,
}

app.use(helmet())

app.route('/').get((req, res) => {
  res.sendFile(process.cwd() + '/views/index.html')
})

app.route(/\/(.*)/).get((req, res) => {
  const path = decodeURIComponent(url.parse(req.url).path.slice(1))
  var date
  if (path.match(/^\d+$/)) {
    console.log('path matched digits?')
    date = new Date(parseInt(path, 10))
  } else {
    date = new Date(path)
  }
  const options = {month: 'long', day: 'numeric', year: 'numeric'}
  if (Object.prototype.toString.call(date) === "[object Date]") {
    retObj.natural = date.toLocaleString('en-US', options)
    retObj.unix = Date.parse(date)
  }
  res.json(retObj)
})

app.listen(process.env.PORT || 27010, () => {
  console.log('node.js listening')
})
