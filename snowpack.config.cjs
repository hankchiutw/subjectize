/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: '/',
    public: { url: '/', static: true, resolve: false },
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
