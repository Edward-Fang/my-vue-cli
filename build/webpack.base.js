const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const ProgressBarWebpackPlugin = require("progress-bar-webpack-plugin"); // 进度条
const chalk = require("chalk");

// 复用loader
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  "css-loader",
  {
    // 还需要在package.json中定义browserslist
    loader: "postcss-loader",
    ident: "postcss",
    options: {
      postcssOptions: {
        plugins: () => [require("postcss-preset-env")()],
      },
    },
  },
];

module.exports = {
  entry: {
    main: "./src/main.js",
  },
  output: {
    path: __dirname + "/dist",
    filename: "js/chunk-[contenthash:8].js",
    // 每次打包前自动删除旧的dist\
    clean: true,
  },
  // webpack5不用下载 cache-loader
  cache: {
    type: "filesystem", // 使用文件缓存
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCssLoader],
      },
      {
        test: /\.scss$/,
        use: [
          ...commonCssLoader,
          "sass-loader",
          // {
          //     loader: 'sass-resources-loader',
          //     option: {
          //         resources: [
          //             // 放置全引入的公共 scss 文件
          //         ]
          //     }
          // }
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024,
          },
        },
        generator: {
          filename: "images/[contenthash:8][ext][query]",
        },
      },
      {
        test: /\.js$/,
        include: __dirname + "/src",
        exclude: /node_modules/,
        use: [
          "thread-loader", // 多进程打包
          "babel-loader",
        ],
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      // js文件插入到body
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: "styles/chunk-[contenthash:8].css",
      ignoreOrder: true,
    }),
    new VueLoaderPlugin(),
    new ProgressBarWebpackPlugin({
      format: `build [:bar] ${chalk.green.bold(":percent")}(:elapsed seconds)`,
    }),
  ],
  resolve: {
    // 路径别名
    alias: {
      "@": __dirname + "/src",
      assets: "~/assets",
      tools: "~/tools",
    },
    // 引入文件时省略后缀
    extensions: [".js", ".ts", ".scss", ".vue"],
  },
};
