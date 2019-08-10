const path = require('path');

module.exports = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };
    config.resolve.alias = {
      ...config.resolve.alias,
      utils: path.resolve(__dirname, 'utils'),
      styles: path.resolve(__dirname, 'styles'),
      shared: path.resolve(__dirname, 'components/shared'),
    };
    return config;
  },
};
