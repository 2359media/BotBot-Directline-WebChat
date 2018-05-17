var webpack = require('webpack');
require('expose-loader');

var coreConfig = {
  devtool: 'source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        PARENT_ORIGIN: JSON.stringify('http://localhost:8000'),
        MS_APP_ID: JSON.stringify('3350aaac3-9566-48ea-98a5-1f194a26e767')
      }
    })
  ],

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [/node_modules/]
      },
      {
        test: require.resolve('microsoft-adaptivecards'),
        use: [{ loader: 'expose-loader', options: 'AdaptiveCards' }]
      }
    ]
  }
};

var chatConfig = {
  entry: './src/BotChat.ts',
  output: {
    libraryTarget: 'umd',
    library: 'BotChat',
    filename: './botchat.js'
  }
};

// Config for addon features
var featureConfig = {
  entry: {
    CognitiveServices: './src/CognitiveServices/lib.ts'
  },
  output: {
    libraryTarget: 'umd',
    library: '[name]',
    filename: './[name].js'
  }
};

module.exports = [Object.assign(chatConfig, coreConfig), Object.assign(featureConfig, coreConfig)];
