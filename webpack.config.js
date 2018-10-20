const CopyPlugin = require('copy-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/app/index.tsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/app'
  },
  devtool: dev ? 'source-map' : 'hidden-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.css/,
        exclude: /common\.css$/,
        use: [
          CssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              minimize: !dev,
              sourceMap: dev,
            }
          },
          'postcss-loader',
        ],
      },
      {
        test: /common\.css/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
            },
          },
          'extract-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: !dev,
              sourceMap: dev,
            },
          },
          'postcss-loader',
        ]
      }
    ]
  },
  
  plugins: [
    new CopyPlugin(['src/app/index.html']),
    new CssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
