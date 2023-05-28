const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
    host: 'localhost',
    port: 9000 // 端口
  }
}

//为了好维护css，安装了sass
// npm install node-sass -S
// npm install sass-loader -S
