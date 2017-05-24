// Run in shell
// NODE_ENV=production /node_modules/.bin/webpack -p --config webpack.config.js

module.exports = {
  devtool: 'source-map',
  entry: [
    './app/core.js'
  ],

  output: {
    path: '/assets/js',
    filename: 'bundle.js'
  },

  devServer: {
    inline: true,
    port: 3000
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      }
    ]
  }
}
