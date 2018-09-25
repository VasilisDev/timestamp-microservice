// server.js
// where your node app starts
// init project
var express = require('express');
var app = express();
//moment.js package
var moment = require('moment');
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)

// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/api/timestamp/:date', function(req, res){
var date = Number(req.params.date);
var mmnt = moment(isNaN(date) ? req.params.date : date);
res.setHeader('Content-Type', 'application/json');
res.send(JSON.stringify({
  unix: mmnt.valueOf(),
  natural: mmnt.format('MMMM D, YYYY')
}));
})
// 404 ERROR
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('404 Not found');
});

// 500 ERROR
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'ERROR 500 INTERNAL SERVER ERROR');
  }
})
var port = process.env.PORT || 8080;        // set our port


// listen for requests :)
var listener = app.listen(port, function () {
  console.log('The app is listening on port ' + port);
});
