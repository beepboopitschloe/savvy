var path = require('path');

module.exports = {
  entry: './src/app.js',
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
        //tell webpack to use jsx-loader for all *.jsx or *.react.js files
        loader: 'jsx-loader',
        test: /\.(jsx|react\.js)$/
      }
    ]
  },
  externals: {
    //don't bundle the 'react' npm package with our bundle.js
    //but get it from a global 'React' variable
    // 'react': 'React'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
