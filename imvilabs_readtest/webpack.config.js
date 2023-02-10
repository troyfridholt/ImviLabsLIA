const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: ['./src/App.js', 
    './src/index.js', 
    './src/server.js', 
    './src/components/Content/content.js', 
    './src/components/Header/header.js', 
    './src/components/Footer/footer.jsx', 
    './src/components/Navbar/navbar.js', 
    './src/components/Navbar/navItems.js', 
    './src/components/Link/link.js', 
    './src/components/DropdownMenu/dropdownitems.js', 
    './src/components/DropdownMenu/DropdownMenu.js', 
    './src/firebase/Firebase.js'],
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
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
  
        // Second Rule
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localsConvention: 'camelCase',
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
  };