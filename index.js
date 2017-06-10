'use strict'

const express = require('express')
const path = require('path')

const DEV_PORT = 3000
const PUBLIC = path.join(__dirname, 'public')

const app = express()
app.use(express.static(PUBLIC))
app.get('/', (req, res) => {
  res.sendFile('/index.html')
})

app.listen(DEV_PORT, () => {
  console.log(`Sleep Solutions Demo listening on ${DEV_PORT}.`)
})
