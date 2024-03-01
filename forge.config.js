module.exports = {
  packerConfig: {
    asar: true,
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
  ],
  plugins: [
    // {
    //   name: "@electron-forge/plugin-auto-unpack-natives",
    //   config: {},
    // },
    {
      name: "@electron-forge/plugin-webpack",
      config: {
        loggerPort: 9001,
        mainConfig: "./webpack.electron.config.js",
        devContentSecurityPolicy: "connect-src 'self' * 'unsafe-eval'",
        devServer: {
          client: {
            overlay: {
              runtimeErrors: (error) => {
                if (error?.message === "ResizeObserver loop completed with undelivered notifications.") {
                  console.error(error);
                  return false;
                }
                return true;
              },
            },
          },
        },
        renderer: {
          config: "./webpack.config.js",
          entryPoints: [
            {
              html: "./public/index.html",
              js: "./src/index.js",
              name: "main_window",
              preload: {
                js: "./wrapper/preload.js",
              },
            },
          ],
        },
      },
    },
  ],
};
