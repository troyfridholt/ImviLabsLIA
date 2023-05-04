const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: [
    './src/App.js', 
    './src/index.js', 
    './src/server.js', 
    './src/components/Content/Content.js', 
    './src/components/Content/Login.js',
    './src/components/Content/Register.js',
    './src/components/Content/LevelSelector.js',
    './src/components/Content/QuestionsForm.js',
    './src/components/Content/ReadingText.js',
    './src/components/Content/Statistics.js',
    './src/components/Content/WelcomePage.js',
    './src/components/Header/Header.js', 
    './src/components/NavbarR/NavbarR.js',  
    './src/firebase/Firebase.js',
    './src/components/Profile/LineChart.js',
    './src/components/Profile/Profile.js',
    './src/components/Profile/Settings.js'],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js'
    },

    devtool: 'inline-source-map',
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
        favicon: 'public/favicon.ico'
      }),
    ],
    devServer: {
      host: 'localhost',
      port: 3000,
      historyApiFallback: true,
      open: true
    },
    module: {
      rules: [
        // First Rule
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            }
          }
        },
  
        // Second Rule
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            }
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'images/'
              }
            }
          ]
        },
      ]
    },
    stats: 'errors-only'
  };