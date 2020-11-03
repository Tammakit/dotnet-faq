/* eslint-disable no-new */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');

module.exports = {
  entry: {
    main: './src/main',
    'mind-map': './src/mind-map',
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },
  plugins: [
    // React flow try to read 'process.env value on browser
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({}),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
          {
            loader: 'extract-loader',
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
  },
};
