import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', function(req, res){
  // hard coded for demo, Pretending this hits a real db
  // res.json([
  //  {"id": 1,"firstName":"Bob", "lastName":"Smith", "email":"bob@gmail.com"},
  //  {"id": 2,"firstName":"Tammy", "lastName":"Norton", "email":"tnorton@yahoo.com"},
  //  {"id": 3,"firstName":"Steve", "lastName":"Witt", "email":"steve.witt@hotmail.com"}
  // ]);
  var request = require('request');
  request('http://localhost:3001/users', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the google web page.
    res.send(body);
  }
})
});

  app.listen(port, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      open('http:/localhost:' + port);
    }
  });
