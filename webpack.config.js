const webpack = require("webpack");
const path = require("path");

var config = {
	entry: path.resolve(__dirname, "./src"),
	output: {
		filename: "app.bundle.js",
		path: path.resolve(__dirname, "./dist")
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["env", "react"]
					}
				}
			}
		]
	}
};

module.exports = config;