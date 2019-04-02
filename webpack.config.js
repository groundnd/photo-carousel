const path = require('path');


module.exports = {
  entry: path.join(__dirname, '/client/src/index.jsx'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader',
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          module: true,
          localIdentName: '[name]__[local]___[hash:base64:5]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css'],
  },
  output: {
    filename: 'carousel.app.js',
    path: path.join(__dirname, '/public'),
  },
};
