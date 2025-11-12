const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

// Updated configuration
module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      publicPath: isProduction ? '/reactDemo/' : '/',
      clean: true,
    },
    devServer: {
      port: 3002,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: ["@babel/preset-react"],
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "reactApp",
        filename: "remoteEntry.js",
        exposes: {
          "./ReactComponent": "./src/bootstrap.js",
        },
        shared: {
          react: {
            singleton: true,
            eager: false,
            requiredVersion: "^18.0.0",
            strictVersion: false,
          },
          "react-dom": {
            singleton: true,
            eager: false,
            requiredVersion: "^18.0.0",
            strictVersion: false,
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new CopyPlugin({
        patterns: [
          { from: ".nojekyll", to: "." },
        ],
      }),
    ],
  };
};
