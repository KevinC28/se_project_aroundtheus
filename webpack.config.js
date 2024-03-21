const path = require('path');

module.exports = {
    entry: { 
        main:'./src/index.js',
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        publicPath: ""
    },

    module: {
        rules: [
            {
            test: /\.js$/,
            loader: "babel-loader",
            exclude: "/node_modules/"
            }
        ]
    },
}
