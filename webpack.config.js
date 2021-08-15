const path = require('path');
module.exports = {
  mode: 'production',
  entry: {
    './dist/exprcalc':{
      publicPath:'/dist/',
      import:'./src/index.js',
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
  devServer:{
    static:__dirname,
    liveReload:false,
    open:true,
    port:8082
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        },
        exclude: /node_modules/
      }
    ],
  }
};
