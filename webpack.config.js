const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  mode: 'development',
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: [
      'node_modules',
      // 'files/**/*.js',
    ],
  },
  context: __dirname,
  entry: './src/editor/main.tsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/js/',
    publicPath: '/js/',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [__dirname + '/node_modules'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
  plugins: [new MonacoWebpackPlugin()],
}
