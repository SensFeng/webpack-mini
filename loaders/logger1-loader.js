function loader (source) {
  console.log('log1 loader running -----')
  return source + '//1';
}
module.exports = loader;