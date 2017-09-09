const webpack = require("webpack");
const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");


module.exports = {
    entry:  {
        index: "./src/index.js"
    }
    ,output: {
        filename: "bundle.js"
        ,path: path.resolve("./dist")
        ,pathinfo:true
    }
    ,module: {
        rules: [
            {
                test: /\.css$/
                ,use: ["style-loader","css-loader"] 
                ,include: [
                    path.resolve("src")
                ]
            }
            ,{
                test: /\.((html)|(jpe?g)|(png)|(mp3))$/
                ,loader: "file-loader"
                ,options: {
                    name: "[name].[ext]"
                }
                ,include: [
                    path.resolve("src")
                ]
            }
        ]
    }
    ,plugins: [
        new CleanPlugin(["./dist"])
    ]

}