/* eslint-disable no-undef */
// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require('path')
const { merge } = require('webpack-merge')
const portfinder = require('portfinder')
const baseConfig = require('./webpack.base.js')
// 合并公共配置,并添加开发环境配置
const devWebpackConfig = merge(baseConfig, {
  optimization: {
    minimize: false
  },
  mode: 'development', // 开发模式,打包更加快速,省了代码优化步骤
  devtool: 'inline-source-map',
  cache: {
    type: 'filesystem' // 使用文件系统级缓存
  },
  watchOptions: {
    ignored: /node_modules/
    // 其他监视选项
  },
  externals: {},
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  devServer: {
    host: '0.0.0.0',
    port: 5150,
    hot: true,
    client: {
      logging: 'none',
      overlay: false,
      progress: true
    }
  }
})
module.exports = new Promise((resolve, reject) => {
  // portfinder.basePort = process.env.PORT || devWebpackConfig.devServer.port
  portfinder.basePort = devWebpackConfig.devServer.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      devWebpackConfig.devServer.port = port
      resolve(devWebpackConfig)
    }
  })
})
