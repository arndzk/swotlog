const path = require('path');

module.exports = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      components: path.resolve(__dirname, 'components/'),
      constants:  path.resolve(__dirname, 'constants/'),
      views: path.resolve(__dirname, 'views/'),
      utils: path.resolve(__dirname, 'utils/'),
      actions: path.resolve(__dirname, 'store/actions/'),
    };
    
    return config;
  },
};