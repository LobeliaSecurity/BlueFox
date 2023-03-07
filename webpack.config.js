module.exports = {
  // development or production
  mode: "production",

  entry: "./src/index.js",
  output: {
    path: `${__dirname}/dist`,
    filename: "bluefox.js",
  },
  resolve: {
    extensions: [".js"],
  },
};
