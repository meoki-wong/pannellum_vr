module.exports = {
    devServer: {
        port:8080,
      proxy: {
        '/product/': {
          target: 'http://39.98.222.11:8080',
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
          changeOrigin: true,
        }
      }
    }
  }