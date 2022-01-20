module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    "@babel/preset-react"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": 3,
        "helpers": true,
        "regenerator": true,
        "version": "7.0.0-beta.0",
        "useESModules": false
      }
    ]
  ]
}