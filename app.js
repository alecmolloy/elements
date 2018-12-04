var compression = require('compression'),
  express = require('express'),
  logger = require('morgan'),
  path = require('path'),
  webpack = require('webpack'),
  webpackConfig = require('./webpack.config.js');

var app = express(),
  port = process.env.PORT || 3000

app.use(compression())
app.use(logger('dev'))

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})
let compiler = webpack(webpackConfig)
app.use(
  require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
)
app.use(require('webpack-hot-middleware')(compiler))
app.use(express.static(path.resolve(__dirname, 'dist')))
