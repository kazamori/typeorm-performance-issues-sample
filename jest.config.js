module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: "/tests/.*index.ts$",
  moduleNameMapper: {
    "#/(.*)$": "<rootDir>/src/$1"
  }
};
