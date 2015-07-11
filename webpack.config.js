var path = require('path');

module.exports = {
  entry: './src/bootstrap.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build')
  },
  module: {
    loaders: [{
      // babel
      loader: 'babel-loader',
      test: /\.(js|jsx)$/,
      exclude: /node_modules/
    },{
      // raw html files
      loader: 'raw-loader',
      test: /\.html$/,
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['', '.js']
  }
};
