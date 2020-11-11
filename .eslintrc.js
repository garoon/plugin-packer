module.exports = {
  extends: "@cybozu/eslint-config/presets/node-typescript-prettier",
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  settings: {
    node: {
      tryExtensions: [".ts", ".d.ts", ".js", ".json", ".node"],
    },
  },
};
