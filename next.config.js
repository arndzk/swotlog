const path = require('path');

module.exports = {
  webpack(config) {
    config.resolve.alias['components'] = path.resolve(__dirname, 'components/');
    config.resolve.alias['constants'] = path.resolve(__dirname, 'constants/');
    return config;
  },
};