/**
 * Created by Administrator on 2016/7/28.
 */
var path = require('path');
var webpack = require('webpack');

//分离css单独打包
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ExtracCssPlugin= new ExtractTextPlugin('[name].css');

//代码压缩(只在生产环境使用)
var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
});

//提公用js到common.js文件中
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

//文件头部信息
var BannerPlugin = new webpack.BannerPlugin('This file is created by hlp');

//动态生成html
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        bundle1:'./demo/bundle1.js',
        bundle2:'./demo/bundle2.js'
    },
    output:{
        path: path.join(__dirname, 'dist'),
        //publicPath:'http://mycdn.com',
        filename: '[name].js'
    },
    module:{
        loaders:[
            //{test:/\.css$/, loader:'style-loader!css-loader'},//css生成内嵌的style标签
            {test:/\.css$/,loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            //{test:/\.(png|jpg|gif)$/,loader:'url-loader?limit=8192'},
            {test:/\.(png|jpg|gif)$/,loader:'url-loader',query:{
                name:'[path][name].[ext]?[hash:8]',
                limit: 8192 // inline base64 URLs for <=8k images, direct URLs for the rest
            }},
            {test:/\.json$/,loader:'json'},
            {test:/\.html$/,loader:'html'}
        ]
    },
    externals:{
        jquery: 'window.$'
    },
    devServer: {//仅在开发环境使用热更新 webpack-dev-server;
        contentBase: "./demo"
    },
    devtool:"#source-map",
    plugins:[
        BannerPlugin,
        commonsPlugin,
        ExtracCssPlugin,
        UglifyJsPlugin,
        new HtmlWebpackPlugin({
            inject:true,    //允许插件修改哪些内容，包括head与body
            hash:true,    //为静态资源生成hash值
            template:'./demo/index.html',
            minify: false
            //minify: {    //压缩HTML文件
            //    removeComments: true,    //移除HTML中的注释
            //    collapseWhitespace: false    //删除空白符与换行符
            //}
        })]
};