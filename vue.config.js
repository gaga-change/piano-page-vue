module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 80,
    https: false,
    open: true,
    hotOnly: true,
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://localhost:8680",
        changeOrigin: true
      }
    }
  }
};
