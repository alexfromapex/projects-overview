module.exports = function (api) {
  const presets = ['@babel/preset-env','@babel/preset-react'];
  const plugins = [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-transform-destructuring',
        '@babel/plugin-syntax-dynamic-import'
  ];
  api.cache(true);
  return {
    presets,
    plugins
  };
}
