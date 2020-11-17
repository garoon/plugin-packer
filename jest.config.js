module.exports = {
  testRegex: "/test/*.*.ts$",
  testPathIgnorePatterns: ["/node_modules/", "/helper/", "/fixtures/"],
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      diagnostics: {
        ignoreCodes: [2322, 2571, 6031, 18003],
      },
    },
  },
};
