const path = require('path');

<<<<<<< HEAD
=======

>>>>>>> Entry and Output path fixed
module.exports = {
  entry: path.join(__dirname, '/client/src/index.jsx'),
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
    ],
  },
  output: {
<<<<<<< HEAD
    filename: 'app.js',
=======
    filename: 'bundle.js',
>>>>>>> Entry and Output path fixed
    path: path.join(__dirname, '/public'),
  },
};
