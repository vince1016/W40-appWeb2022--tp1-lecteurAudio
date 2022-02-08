// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  mode: 'development',
  devtool: 'eval-source-map',
  watch: false,
  watchOptions: {
    ignored: ['node_modules/**', 'dist/**']
  }
}
