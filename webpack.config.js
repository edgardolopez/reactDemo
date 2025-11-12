const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Updated configuration
module.exports = {
  mode: "development",
  entry: "./src/index.js", // Back to index.js as entry
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
  ],
};
