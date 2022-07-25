module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": ["error", "double"],
    "linebreak-style": ["off"],
    "max-len": ["off"],
    "indent": ["off"],
    "semi": ["off"],
    "comma-spacing": ["off"],
    "spaced-comment": ["off"],
    "no-unused-vars": ["off"],
  },
};
