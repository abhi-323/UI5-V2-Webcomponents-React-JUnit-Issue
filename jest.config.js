module.exports = {
  verbose: true,
  roots: ["<rootDir>/src/"],
  setupFiles: [
    "<rootDir>/src/test/jestPreSetup.js",
  ],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom",
    "<rootDir>/src/test/jestSetupTests.js",
  ],
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: [
    "node_modules/(?!(@ui5|lit-html))",
    "node_modules/(?!(@ui5|lit-html)).*\\.js$",
  ],
  modulePathIgnorePatterns: ["mocks"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transform: {
    "^.+\\.(js|ts|tsx)$": "<rootDir>src/test/jest.transform.js",
  },
  moduleNameMapper: {
    "^pages": "<rootDir>/src/pages",
    "^components": "<rootDir>/src/components",
    "^config": "<rootDir>/src/config",
    "^services/(.*)": "<rootDir>/src/services/$1",
    "^utils": "<rootDir>/src/utils",
    "^decorators": "<rootDir>/src/decorators",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/test/mockFile.js",
    "\\.(css|less)$": "<rootDir>/src/test/mockStyle.js",
  },
  testResultsProcessor: "jest-sonar-reporter",
  collectCoverage: true,
  coverageDirectory: "<rootDir>/src/test/jestcoverage",
  coverageReporters: ["json", "lcov", "text", "cobertura", "clover"],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "<rootDir>/src/test",
        outputName: "jest-junit.xml",
      },
    ],
  ],
};
