/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: '/',
  },
  buildOptions: {
    out: 'dist',
  },
  plugins: ['@snowpack/plugin-typescript'],
  optimize: {
    bundle: true,
    minify: true,
  },
};
