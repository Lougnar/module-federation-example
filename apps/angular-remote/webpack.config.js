const webpack = require("webpack");
const { ModuleFederationPlugin } = require("webpack").container;
// REMOTE
module.exports = {
  optimization: {
    runtimeChunk: false,
    splitChunks: false,
  },
  output: {
    publicPath: "http://localhost:5000/",
    uniqueName: "mdmfapp2",
    scriptType: "text/javascript",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2", // remote name before @ in host config
      filename: "remoteEntry.js",
      library: { type: "var", name: "app2" },
      // exposed modules
      exposes: {
        App2: "./apps/angular-remote/src/app/feature/feature.module.ts",
        ButtonComponent:
          "./apps/angular-remote/src/app/button/button.component.ts",
      },
      shared: {
        "@angular/core": {
          requiredVersion: "^15.2.4",
          strictVersion: true,
          singleton: true,
        },
        "@angular/common": {
          requiredVersion: "^15.2.4",
          strictVersion: true,
          singleton: true,
        },
        "@angular/common/http": {
          requiredVersion: "^15.2.4",
          strictVersion: true,
          singleton: true,
        },
        "@angular/router": {
          requiredVersion: "^15.2.4",
          strictVersion: true,
          singleton: true,
        },
      },
    }),
  ],
};
