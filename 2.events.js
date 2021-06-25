class Events {
  constructor(){
    this.events = {}
  }
  on(name, fn) {
    this.events[name] = [fn]
  }
  emit(name, data) {
    // this.events[name].push()
    this.events[name].forEach(fn => fn(data))
  }
}
let events = new Events();

events.on('data', (data) => {
  console.log('data', data);
});

events.emit('data', {name: 'tom'});