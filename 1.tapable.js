// const {SyncHook} = require('tapable');

class SyncHook {
  constructor(args){
    this.args = args || [];
    this.taps = []
  }
  tap(name, fn) {
    this.taps.push(fn);
  }
  call(){
    let args = Array.prototype.slice.call(arguments, 0, this.args.length);
    console.log('args', args);
    this.taps.forEach(tap => tap(...args))
  }
}

const syncHook = new SyncHook(['a']);

syncHook.tap('nothing', (name) => {
  console.log('arguments', name);
});

syncHook.call('zhufeng')


// tapable跟events有什么不同？
// tapable没有监听的事件名，webpack里面大概有4-500个勾子
// 优点就是结构清晰，webpack提供钩子，可以做到各干个的，互不干扰，
