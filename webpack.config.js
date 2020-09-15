const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    'tour': './src/index.ts',
    'tour.min': './src/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'], 
  },
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin({
      include: /\.min\.js$/
    })]
  },
  output: {
     path: path.resolve(__dirname, 'dist'),
     filename: '[name].js',
     libraryTarget: 'var',
     umdNamedDefine: true,
     library: 'Tour',
  },
};
