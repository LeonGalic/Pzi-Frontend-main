// vue.config.js
const path = require('path');

module.exports = {
  devServer: {
    port: 3000,
  },
  configureWebpack: {
    resolve: {
      alias: {
        'vue-carousel$': 'vue-carousel/dist/vue-carousel.css',
      },
    },
  },
};
