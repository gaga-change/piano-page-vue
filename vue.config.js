module.exports = {
  devServer: {
    host: "page.wx.carry.junn.top",
    port: 80,
    https: false,
    open: true,
    hotOnly: true,
    proxy: {
      "/api": {
        target: "http://localhost:8680",
        changeOrigin: true
      }
    }
  }
};
