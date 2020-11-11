module.exports = {
  testRegex: "src/__test__/*.*[jt]s$",
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
