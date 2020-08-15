let path = require("path");
let argv = require("yargs-parser")(process.argv.slice(2));
const merge = require("webpack-merge");
const _mode = argv.mode || "development";
const _modeflag = _mode === "production" ? true : false; //判断环境
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HappyPack = require("happypack");
const CopyPlugin = require("copy-webpack-plugin");
const os = require("os");
//开辟一个线程池
const happyThreadPoll = HappyPack.ThreadPool({ size: os.cpus().length });
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 这个插件用来 remove/clean your build folder(s). 我们这里是 dist 目录

let webpackConfig = {
  entry: "./src/webapp/app.js",
  watch: !_modeflag,
  devServer: {
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
        use: "happypack/loader?id=happyBabel",
        //排除node_modules 目录下的文件
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "联调平台",
      template: "./src/webapp/index.html", // 模版原始路径
      filename: path.join(__dirname, "/dist/index.html"), // index.html 输出目录
    }),
    new CleanWebpackPlugin(),
    new HappyPack({
      id: "happyBabel",
      threadPool: happyThreadPoll,
      verbose: true,
      loaders: [
        {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      ],
    }),
    new CopyPlugin({
      patterns: [{ from: "src/webapp/static", to: "static" }],
    }),
  ],
  resolve: {
    alias: {
      Static: path.resolve(__dirname, "src/webapp/static"),
      components: path.resolve(__dirname, "src/webapp/components"),
      commonComponents: path.resolve(__dirname, "src/webapp/components/common"),
      constants: path.resolve(__dirname, "src/webapp/constants"),
      store: path.resolve(__dirname, "src/webapp/store"),
      utils: path.resolve(__dirname, "src/webapp/utils"),
    },
  },
};
module.exports = merge(_mergeConfig, webpackConfig);
