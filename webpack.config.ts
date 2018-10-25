import CopyPlugin = require('copy-webpack-plugin');
import CssExtractPlugin = require('mini-css-extract-plugin');

const dev = process.env.NODE_ENV !== 'production';

if (dev) {
  import('./src/dev-server').then(({ start }) => start());
}

module.exports = {
  entry: './src/app/index.tsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/app',
  },
  devtool: dev ? 'source-map' : 'hidden-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      dev && { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.css$/,
        exclude: /common\.css$/,
        use: [
          CssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: dev,
              loaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /common\.css$/,
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
              sourceMap: dev,
              loaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.woff(|2)(\?[a-z0-9]+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
        },
      },
      {
        test: /\.(ttf|eot|svg)(\?[a-z0-9]+)?$/,
        loader: 'file-loader',
      },
    ].filter(Boolean),
  },

  plugins: [
    new CopyPlugin(['src/app/index.html']),
    new CssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
