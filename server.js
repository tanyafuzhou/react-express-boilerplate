const path = require('path')
const express = require('express')
const webpack = require('webpack')
const http = require('http')
const https = require('https')
const fs = require('fs-extra-promise')

const app = express()
const config = require('./webpack.dev.config')

const compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: '/'
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('/index.html', function (req, res) {
  res.sendFile(path.join(__dirname, './index.html'))
})

app.get(
  '/libs/react.min.js',
  function (req, res) {
    res.sendFile(path.join(__dirname, 'libs/react-with-addons.js'))
  }
)
app.get(
  '/libs/react-dom.min.js',
  function (req, res) {
    res.sendFile(path.join(__dirname, 'libs/react-dom.js'))
  }
)
app.get(
  '/libs/ReactRouter.min.js',
  function (req, res) {
    res.sendFile(path.join(__dirname, 'libs/ReactRouter.js'))
  }
)

function getUserHomeDir () {
  return process.env.HOME || process.env.USERPROFILE
}
const options = {
  key: fs.readFileSync(getUserHomeDir() + '/.tap/cert/server.key'),
  cert: fs.readFileSync(getUserHomeDir() + '/.tap/cert/server.crt')
}

const httpServ = http.createServer(app)
const httpsServ = https.createServer(options, app)

const startHttps = () => {
  httpsServ.listen(443, function () {
    const env = process.env
    const uid = parseInt(env['SUDO_UID'] || process.getuid(), 10)
    const gid = parseInt(env['SUDO_GID'] || process.getgid(), 10)
    process.setgid(gid)
    process.setuid(uid)
    console.log('port 443 is open')
  })
}

const start = () => {
  httpServ.listen(80, function () {
    console.log('port 80 is open')
    startHttps()
  })
}

start()
