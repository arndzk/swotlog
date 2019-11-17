const path = require('path');

module.exports = {
  webpack(config) {
    config.resolve.alias['components'] = path.resolve(__dirname, 'components/');
    config.resolve.alias['constants'] = path.resolve(__dirname, 'constants/');
    config.resolve.alias['views'] = path.resolve(__dirname, 'views/');
    config.resolve.alias['utils'] = path.resolve(__dirname, 'utils/');
    return config;
  },
};