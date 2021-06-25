const {
	SyncHook,
	SyncBailHook,
	AsyncParallelHook,
	AsyncSeriesHook
} = require("tapable");
const path = require('path');
const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const types = require('babel-types');
const {resolveExtensions} = require('./const');

class Complier {
  constructor(options) {
    this.options = options;
    this.hooks = {
      run: new SyncHook(["compiler"]),
      done: new SyncHook(["stats"]),
    }
  }
  run() {
    // 开始编译
    this.hooks.run.call();
    let entry = path.join(this.options.context, this.options.entry);
    this.buildModule(entry);
    // 编译结束
    this.hooks.done.call();
  }
  buildModule(modulePath) {
    let originalSourceCode = fs.readFileSync(modulePath, 'utf8');
    let targetSourceCode = originalSourceCode;
    // 收集loader
    const rules = this.options.module.rules;
    
    let loaders = [];
    for(let i = 0; i < rules.length; i++) {
      // 要匹配上test才丢到执行loaders中
      if(rules[i].test.test(modulePath)) {
        loaders = [...loaders, ...rules[i].use];
      }
    }
    // 执行loader
    for(let i = loaders.length - 1; i >= 0; i--) {
      let loader = loaders[i];
      targetSourceCode = require(loader)(targetSourceCode);
    }
    // 查找依赖 只支持commonJs规范
    let astTree = parser.parse(targetSourceCode, {sourceType: 'module'});
    traverse(astTree, {
      CallExpression({node}) {
        if(node.callee.name === 'require') {
          let moduleId = node.arguments[0].value;
          let dirname = path.posix.dirname(modulePath); 
          let depModulePath = path.posix.join(dirname, moduleId);
          console.log('depModulePath', depModulePath);
        }
      }
    })
  }
}

module.exports = Complier;