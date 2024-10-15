const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/landingpage/' // Reemplaza 'landingpage' por el nombre de tu repositorio
    : '/'
});
