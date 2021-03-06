module.exports = {
  displayName: "trivia",
  preset: "../../jest.preset.js",
  setupFilesAfterEnv: ["<rootDir>/src/test-setup.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.(html|svg)$"
    }
  },
  coverageDirectory: "../../coverage/apps/trivia",
  transform: { "^.+.(ts|mjs|js|html)$": "jest-preset-angular" },
  transformIgnorePatterns: ["node_modules/(?!.*.mjs$|@datorama/akita)"],
  snapshotSerializers: [
    "jest-preset-angular/build/serializers/no-ng-attributes",
    "jest-preset-angular/build/serializers/ng-snapshot",
    "jest-preset-angular/build/serializers/html-comment"
  ]
};
