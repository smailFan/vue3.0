const path = require('path');//路径
//安装 npm install uglifyjs-webpack-plugin --save-dev
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProduction = process.env.NODE_ENV === "production";

//引入文件
function resolve(dir){
    return path.join(__dirname,dir)
}

module.exports = {
    //基本路径
    publicPath:'.',//baseUrl
    outputDir:'dist',
    lintOnSave:true,//eslint-loader 在保存得时候检查
    devServer:{
        compress:false,//压缩
        open:true,
        // proxy:{
        //     '/api':{
        //         target:'http:xxx.com',//需要代理得服务器
        //         ws:true,//websocket
        //         changeOrigin:true,//是否允许跨域
        //         pathRewrite:{
        //             '/api':'/'
        //         }
        //     }
        // }
    },
    //css相关配置
    css:{
        //css分离插件（打包）
        extract:true,
        //方便开发人员的错误定位 true打包时间大大增加
        sourceMap:false,
        //css预处理器
        loaderOptions:{
            scss: {
                prependData: `@import "@/assets/common/index.scss";`
              },
        },
        modules:false,//是否启用css

    },
    //webpack配置
    chainWebpack:config=>{
        //配置别名
        config.resolve.alias
        .set("@",resolve("src"))
        .set("@img",resolve("src/assets/img"))
        .set("@scss",resolve("src/assets/common"))
        //生产环境配置
        if(isProduction){
            config.plugin.delete('preload');//删除预加载
            config.optimization.minimize(true);//开启压缩代码
            //分割代码
            config.optimization.solitChunks({
                chunks:'all'
            })
        }

    },
    configureWebpack:config=>{
        if(isProduction){
            config.plugin.push(
                new uglifyJsPlugin({
                    //删除console和debugger
                    compress:{
                        //warning：false
                        drop_debugger:true,
                        drop_console:true,
                    },
                    sourceMap:false,
                    parallel:true,//使用多进程并行来提高速度
                })
            )
        }else{
            //测试环境
        }
    },
    //生产环境得
    productionSourceMap:false,
    //默认并发数 require("os").cpus().length-1，
    //启用并行化
    parallel:require("os").cpus().length>1,


}