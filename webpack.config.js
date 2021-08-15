const path = require('path');
module.exports = {
  mode: 'production',
  entry: {
    './dist/exprcalc':{
      publicPath:'/dist/',
      import:['core-js/es6/symbol','./src/index.js'],
      library:{
        name: 'Calc',
        export: 'default',
        type: 'umd',
      }
    },
  },
  output:{
    path: __dirname,
    filename:'[name].js'
  },
  optimization: {
    usedExports: true,
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      }
    ],
  }
};
