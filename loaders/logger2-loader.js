function loader (source) {
  console.log('log2 loader running -----')
  return source + '//2';
}
module.exports = loader;