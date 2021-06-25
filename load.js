//

const webpack = require('./webpack');
const config = require('./webpack.config');


const complier = webpack(config);
complier.run();
// complier.run((err, state) => {
//   console.log(err);
//   console.log('state', state.toJson({
//     assets: true,
//     chunks: true,
//     modules: true,
//     entries: true
//   }))
// })