const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
let path = require('path')
module.exports = {
  //代理
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3000',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': '/api'
  //       }
  //     }
  //   }
  // }
}
