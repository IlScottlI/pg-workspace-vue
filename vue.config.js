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

};
