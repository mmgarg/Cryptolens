const CracoLessPlugin = require('craco-less');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.oneOf) {
          rule.oneOf.forEach((oneOf) => {
            if (oneOf.use) {
              oneOf.use.forEach((use) => {
                if (use.loader && use.loader.includes('source-map-loader')) {
                  use.options = {
                    ...use.options,
                    filterSourceMappingUrl: (url, resourcePath) => {
                      if (resourcePath.includes('node_modules/antd')) {
                        return false;
                      }
                      return true;
                    },
                  };
                }
              });
            }
          });
        }
      });
      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
