/* eslint-disable no-undef */
// Generated using webpack-cli https://github.com/webpack/webpack-cli

const { merge } = require('webpack-merge')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const baseConfig = require('./webpack.base.js')
module.exports = merge(baseConfig, {
  mode: 'production', // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
  optimization: {
    minimize: true, // 开启代码最小化
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            // terser 的 parse 配置项
          },
          compress: {
            // 压缩代码的配置项
            drop_console: true, // 去除console
            drop_debugger: true, // 去除debugger
            // 其他压缩选项...
          },
          mangle: false,
          output: {
            comments: false, // 去除注释
            beautify: false,  // 输出压缩的代码
          },
          // 其他terser选项...
        },
        // extractComments: false, // 不要将注释提取到单独的文件中
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 200000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      },
    }
  },
  // plugins: [
  //   new BundleAnalyzerPlugin({
  //     analyzerMode: 'server', // 运行模式，有'server', 'static', 'disabled'三种，详情请查阅官方文档
  //     analyzerPort: 'auto'    // 当发现默认端口被占用时，自动查找可用端口
  //   })
  // ]
})
