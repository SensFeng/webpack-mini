# webpack-mini
手写乞丐版webpack

## hash

> hash一般是结合CND缓存来使用的，通过webpack构建之后，生成对应文件名自动带上对应的MD5值。如果文件内容改变的话，那么对于的文件hash值也会改变，对于的html引用的URL地址也会改变，触发CND服务器从源服务器上拉取对应的数据，进而更新本地缓存


文件指纹 => 是指打包后输出的文件名和后缀
指纹占位符

ext              资源后缀名
name             文件名称
path             文件的相对路径
folder           文件所在的文件夹
hash             每次webpack构建时生成一个唯一的hash值
chunkhash        根据chunk生成hash值，来源于同一个chunk，则hash值就一样
contenthash      根据内容生成hash值，文件内容相同hash值就相同


## 如何选择hash？

hash
chunkhash
contenthash

从上往下，生成的效率越来越低，成本越来越高
影响的范围越来越小，精度越来越细

文件变化的概率特别小，可以选择contenthash；每次都要变选择hash。


## 压缩css和js
   mode = production 默认开启 TerserWebpackPlugin
```js
  npm install optimize-css-assets-webpack-plugin terser-webpack-plugin -D
  // webpack.config.js
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin()
    ]
  },
  plugins: [
    new OptimizeCssAssetsWebpackPlugin()
  ]
```




## Object.prototype.toString.call

```js
Object.prototype.toString.call内部会调用Object.Symbol.toStringTag方法，
所以重写Symbol.toStringTag就可以实现自定义判断的类型，
```


## 源码的调试方法

```js
  // .vscode/launch.json
  {
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "debug webpack",
            "cwd":"${workspaceFolder}",
            "program":"${workspaceFolder}/node_modules/webpack/bin/webpack.js"
        }
    ]
  }
```

或者创建一个debugger.js文件
```js
const webpack = require('webpack');
const config = require('./webpack.config');

const complier = webpack(config);
complier.run((err, state) => {
  console.log(err);
  console.log('state', state.toJson({
    assets: true,
    chunks: true,
    modules: true,
    entries: true
  }))
})
```

## 插件的注册是无序的，插件的执行是有顺序的
- 插件是在webpack开始编译之前就全部挂载了，但是插件的执行要监听的钩子触发的时候才会执行
- 不同的hook，顺序是可以打乱的，互不影响
- 相同的hook，谁先注册谁先执行。