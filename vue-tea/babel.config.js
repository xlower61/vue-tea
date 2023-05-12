module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  //配置vant
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      },
      'vant'
    ]
  ]
}
