module.exports = {
  devServer: {
    open: false,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://vue-admin.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
