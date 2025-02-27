const { createTransformer } = require("babel-jest");

module.exports = createTransformer({
  presets: [
    "babel-preset-react-app",
    [
      "@babel/preset-env",
      { modules: "commonjs", targets: { node: "current" } },
    ],
  ],
  plugins: [
    ["transform-class-properties"],
    ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
  ],
});
