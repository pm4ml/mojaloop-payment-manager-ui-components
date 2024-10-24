module.exports = {
  presets: [
    "@babel/preset-env",   // Transforms modern JavaScript for different environments
    "@babel/preset-react"  // Transforms JSX/React code
  ],
  plugins: [
    "babel-plugin-lodash",  // Optimizes lodash imports to reduce bundle size
    "@babel/plugin-proposal-object-rest-spread",  // Allows use of object rest/spread properties
    "@babel/plugin-transform-runtime"  // Enables reusing Babel's helper functions to save on code size
  ]
};