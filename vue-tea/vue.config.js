const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
    host: '127.0.0.1',
    port: 99 // 端口
  },
  publicPath: './'
}

//为了好维护css，安装了sass

// npm install node-sass -S
// npm install sass-loader -S
