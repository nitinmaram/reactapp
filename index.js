const express = require('express')
const app = express()
const port = 5000
// var readFile = require('./routes/readFile');
// var pairing = require('./routes/pairing');
// var nonrep = require('./routes/nonrep');
// var cors = require('cors')
// const bodyParser = require('body-parser');
// var session = require('express-session')
var notFound = function (req, res, next) {
  res.statusCode = 404;
  res.description = 'Not Found';
  res.send('Not Found')
}
var errorHandler = function (err,req, res, next) {
  console.log(err);
  res.statusCode = 500;
  res.description = 'Internal Error';
  res.send('error')
}
var globalInterceptor = function (req, res, next) {
  var flag = true
  if(flag)
    next()
  else
    res.send('Un Authorised')
}
app.use(globalInterceptor)
// app.use(session({secret: 'secret sentence'}));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors())
// app.use('/',readFile)
// app.use('/pair',pairing)
// app.use('/nonrep',nonrep)
// app.use(notFound)
// app.use(errorHandler)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
