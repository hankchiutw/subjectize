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
    entrypoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    target: 'es2017',
  },
};
