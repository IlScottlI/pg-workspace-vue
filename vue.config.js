module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/Workspace' : '/',
  transpileDependencies: [
    'vuetify'
  ],
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Digital Manufacturing | Workspace',
    },
  },
  devServer: {
    host: '127.0.0.1',
    hot: true,
    disableHostCheck: true,
  },
};
