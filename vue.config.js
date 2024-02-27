


module.exports = {

    configureWebpack: {
        output: {
          jsonpFunction: `webpackJsonp_自定义名称`,
          globalObject: 'window',
        }
      },
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
          },
    }
}