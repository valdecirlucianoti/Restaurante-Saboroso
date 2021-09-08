var createError = require('http-errors');
var express = require('express');
const redis = require('redis');
const session = require('express-session');
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();
var formidable = require('formidable');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var socket = require('socket.io');
var app = express();
var http = http.Server(app);
var io = socket(http);

io.on('connection', function(socket){
  console.log('Novo Usuário conectado');
});

var indexRouter = require('./routes/index')(io);
var adminRouter = require('./routes/admin')(io);

app.use(function (req, res, next) {

  if(req.method === 'POST' && ['/admin/menus', '/subscribe'].indexOf(req.url) > -1){
    var form = formidable({
      multiples: true,
      uploadDir: path.join(__dirname, "/public/images"),
      keepExtensions: true
    });
    
    form.parse(req, (err, fields, files) => {
      req.body = fields;
      req.fields = fields;
      req.files = files;
      next();
    });
  }else{
    next();
  }

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: 'password',
    resave: true,
    saveUninitialized: true
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

http.listen(3000, function(){
  console.log('Servidor em exeção');
});
//module.exports = app;