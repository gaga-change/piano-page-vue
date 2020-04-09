module.exports = {
  devServer: {
    host: "static.local.shop.csj361.com",
    port: 80,
    // port: 8682,
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
