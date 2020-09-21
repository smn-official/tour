const path = require('path');

const { merge } = require('webpack-merge');

const CopyPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonConfig = {
  entry: {
    tour: './src/index.ts',
    'tour.min': './src/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.html$/i,
        loader: 'raw-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin({
      include: /\.min\.js$/,
    })],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'tour.css',
      chunkFilename: '[name].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/**/*.scss',
          to: 'tour.scss',
        },
      ],
    }),
  ],
  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    library: 'Tour',
  },
  stats: {
    colors: true,
  },
};

const developmentConfig = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'demo/tour'),
    library: 'Tour',
  },
};

const productionConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.prod.json',
          },
        }],
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'Tour',
  },
};

module.exports = ({ mode }) => {
  switch (mode) {
    case 'production':
      return merge(commonConfig, productionConfig);
    default:
      return merge(commonConfig, developmentConfig);
  }
};
