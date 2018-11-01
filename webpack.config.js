const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist/js')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: require.resolve('babel-loader'),
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};
