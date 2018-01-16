const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//const passport = require('passport');
const expressValidator = require('express-validator');
const config = require('./config/database');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
mongoose.connect(config.database);
let db = mongoose.connection;

db.once('open', () => {
	console.log('Connected to MongoDB');
});

db.on('error', (err) => {
   console.log(err);
});
const app = express();



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'client')));

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;
 
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use(session({
  secret:config.session.secret,
  resave: true,
  saveUninitialized: true,
  store:new MongoStore({
    mongooseConnection:mongoose.connection
  })
 
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, cache-control, content-type, x-http-method-override");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});


app.use(require('./routes'));

app.listen(process.env.PORT || config.port, () => {
    console.log('Server started on port ' + config.port);
});