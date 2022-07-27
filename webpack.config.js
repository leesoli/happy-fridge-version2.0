const path = require('path');
const SRC_DIR = path.join(__dirname, '/client/src')
const DIST_DIR = path.join(__dirname, '/client/dist');
module.exports = {
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: 'main.js',
    path: DIST_DIR,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ],
  }
};