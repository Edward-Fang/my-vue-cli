const { webpack } = require("webpack");
const { merge } = require("webpack-merge");
const base = require("./webpack.base");

module.exports = merge(base, {
  mode: "development",
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
  devtool: "eval-cheap-module-source-map",
  plugins: [
    // 定义全局变量
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_DEV: JSON.stringify("development"),
        },
      },
    }),
    // 使用webpack提供的热更新插件
    new webpack.HotModuleReplacementPlugin(),
  ],
});
