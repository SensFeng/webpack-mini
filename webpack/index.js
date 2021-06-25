const Complier = require('./complier');

function webpack(options) {
  let complier;
  // 1. 合并参数
  // 获取命令行参数 只支持--mode=development形式
  let shellConfig = process.argv.slice(2).reduce((shellConfig, item) => {
    let [key, value] = item.split('=');
    shellConfig[key.slice(2)] = value;
    return shellConfig;
  }, {});
  let webpackOptions = Object.assign(options, shellConfig);
  // 2. 创建complier并执行配置里面的插件
  complier = createComplier(webpackOptions)
  return complier;
};

function createComplier(rawOptions) {
  rawOptions.context = process.cwd();
  let complier = new Complier(rawOptions);
  if(Array.isArray(rawOptions.plugins)) {
    for(plugin of rawOptions.plugins) {
      plugin.apply(complier)
    }
  }
  return complier
}
module.exports = webpack;