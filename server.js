const express = require('express')
const helmet = require('helmet')
const app = express()
const api = require('./api/new.js')
const validUrl =  require('validator/lib/isURL')

app.use(helmet())

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html')
})

app.get('/badurl', (req, res) => {
  res.sendFile(process.cwd() + '/views/badurl.html')
})

app.get('/badshort', (req, res) => {
  res.sendFile(process.cwd() + '/views/badurl.html')
})

app.get(['/new/:protocol*//:address*', '/new/:address*'], (req, res) => {

  const address = req.params.address

  if(!validUrl(address)) {
    res.redirect('/badurl')
  }

  const protocol = req.params.protocol
  const url = (protocol ? protocol : 'https:') + '//' + address

  console.log('url is: ' + url)

  api.checkNew(url).then(exists => {
    if (exists) {
      api.getShort(url).then(data => res.json(data))
      .catch(err => res.redirect('/'))
    } else {
      api.createShort(url).then(data => res.json(data))
      .catch(err => res.redirect('/'))
    }
  }).catch(err => console.log(err))
})

app.get('/:id', (req, res) => {
  api.getId(req.params.id).then(data => {
    res.redirect(data)
  })
})

app.listen(process.env.PORT || 27010, () => {
  console.log('node.js listening')
})
