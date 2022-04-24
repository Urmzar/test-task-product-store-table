const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "..", './src/client/index.tsx'),
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [ { loader: 'ts-loader' } ],
      },
      {
        test: /\.(css|less)$/,
        use: [ 'style-loader', 'css-loader', 'less-loader' ]
      }
    ],
    parser: {
      javascript: {
        exportsPresence: false,
      },
    },
  },
  output: {
    path: path.resolve(__dirname, '..', './dist/client'),
    filename: 'bundle.js'
  },
  plugins: [ new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '..', './src/client/index.html')
  }) ]
};