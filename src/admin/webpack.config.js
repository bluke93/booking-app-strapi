const path = require("path");

module.exports = (config, webpack) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    // enable process node_modules files if you need
    /*
    const regexToMatch = /\.m?js$/;
    config.module.rules = config.module.rules.map((rule) => {
      if (rule.test.toString() == regexToMatch.toString()) {
        delete rule.exclude;
      }
      return rule;
    });

     */

    // Allow scss modules
    config.resolve = {
      ...config.resolve,
      extensions: [...config.resolve.extensions, ".scss"],
    };

    // Configure a SASS loader
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        "style-loader",
        "css-loader",
        "sass-loader",
        {
          loader: "sass-loader",
          options: {
            implementation: require("sass"),
          },
        },
      ],
    });

  return config;
};
