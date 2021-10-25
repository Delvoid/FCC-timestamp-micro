const express = require('express')
const path = require('path')

const app = express()

const cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 }))

app.use(express.static('public'))

let reqPath = path.join(__dirname, '../')

app.get('/', function (req, res) {
  console.log(__dirname)
  res.sendFile(reqPath + '/views/index.html')
})

app.get('/api/:date', function (req, res) {
  const date = req.params.date
  const response = {}
  if (date.match(/([-/:\s])/g)) {
    response.unix = new Date(date).getTime()
    response.utc = new Date(date).toUTCString()
  } else {
    response.unix = new Date(parseInt(date)).getTime()
    response.utc = new Date(parseInt(date)).toUTCString()
  }
  if (!response.unix || !response.utc) res.json({ error: 'Invalid Date' })
  res.json(response)
})

app.get('/api/', (req, res) => {
  const date = {
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  }
  res.json(date)
})

module.exports = app
