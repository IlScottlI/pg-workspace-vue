module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/system/webdev/Workspace/vue-ui/' : '/',
  transpileDependencies: [
    'vuetify'
  ],
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Workspace',
    },
  },
  configureWebpack: {
    optimization: {
      splitChunks: false, // 🚫 disables all code splitting (removes `~`)
    }
  }
};
