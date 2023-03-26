const webpack = require("webpack");
const { ModuleFederationPlugin } = require("webpack").container;
// SHELL
module.exports = {
  optimization: {
    runtimeChunk: false,
  },
  output: {
    publicPath: "http://localhost:4000/",
    uniqueName: "shell",
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "angular_shell",
      remotes: {
        // app2: <= alias in shell
        // app2@ <= name given in remote
        // http://localhost:5000/remoteEntry.js link to container entry point
        app2: "app2@http://localhost:5000/remoteEntry.js",
        ButtonComponent: "app2@http://localhost:5000/remoteEntry.js",
        vuejs: "http://localhost:5500/remoteEntry.js",
      },
      library: { type: "module" },
      // can provide strict version, or just give package.json dependancies
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
