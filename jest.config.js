module.exports = {
  testRegex: "src/__test__/*.*[jt]s$",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
