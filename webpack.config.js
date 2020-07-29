const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const SRC_DIR = path.resolve(__dirname, "src");
const DEV_DIR = path.resolve(__dirname, "example/js");
const PROD_DIR = path.resolve(__dirname, "dist");

module.exports = (env) => {
  console.log('Production: ', env.production);

  const BUILD_DIR = env.production ? PROD_DIR : DEV_DIR;

  return {
    mode: env.production ? "production" : "development", 

    entry: {
      "html-device": SRC_DIR + "/index.js"
    },
  
    output: {
      path: BUILD_DIR,
      filename: "[name].js",
      library: "HTMLDevice",
      libraryTarget: "umd"
    },
  
    module : {
      rules : [
        {
          test : /\.js$/,
          include : SRC_DIR,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        },
        {
          test : /\.css$/,
          include : SRC_DIR,
          use: ["style-loader", "css-loader"],
        }
      ]
    },

    optimization: env.production ? {
      minimize: true,
      minimizer: [new TerserPlugin()],
    } : {},
  };
}