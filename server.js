const express = require('express')
const helmet = require('helmet')
const url = require('url')
const app = express()

app.use(helmet())

app.route(/\/(.*)/).get((req, res) => {
  res.json({
    ipaddress: req.headers.host.toString(),
    language: req.headers['accept-language'].split(',')[0],
    software: req.headers['user-agent'].toString().match(/\(([^)]+)\)/)[1],
  })
})

app.listen(process.env.PORT || 27010, () => {
  console.log('node.js listening')
})
