const { webpack } = require("webpack");
const { merge } = require("webpack-merge");
const base = require("./webpack.base");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(base, {
  // production模式下自动开启 tree-shaking
  mode: "production",
  devtool: "nosources-source-map",
  plugins: [
    new CssMinimizerPlugin(),
    // 定义全局变量
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_DEV: JSON.stringify("production"),
        },
      },
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        // 不将 comments进行抽离
        extractComments: false,

        // 是否使用多线程进行编译 --- 默认值就是true
        // 可以设置为number，即手动指定设置多少进程进行打包
        // 也可以设置为true，此时parallel的值就是cpus.length - 1
        parallel: true,

        terserOptions: {
          // 在这里对terser进行手动配置
          // 在这里的配置会覆盖默认 terser 中的配置
          compress: {
            drop_console: true, // 去除console
          },
        },
      }),
    ],
  },
});
