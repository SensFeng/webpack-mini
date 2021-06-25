class CustomPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(complier) {
    complier.hooks.run.tap('custom', () => {
      console.log('触发了webpack run 钩子')
    });
    complier.hooks.done.tap('custom', () => {
      console.log('触发了webpack done 钩子')
    })
  }
}

module.exports = CustomPlugin;