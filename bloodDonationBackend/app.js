var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
//var http = require('http');

const app = express();
//const server = http.createServer(app);
//const socketIO = require('socket.io');
//const io = socketIO(server);


var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var user=require('./routes/Api/userDetail');
//const chatRoutes = require('./routes/Api/Messages');


const cors = require("cors");
var config = require('config');
app.use(cors());

/*
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.set('io', io);

/* io.on('connection', (socket) => {
  console.log('A user connected');

  // Join a room when a user connects
  socket.on('join', (userId) => {
    socket.join(userId);
  });

  // Listen for new messages from clients
  socket.on('message', (data) => {
    const { userId, message } = data;

    // Emit the message to the recipient in their room
    socket.to(userId).emit('message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', user);
app.use('/api/chat', chatRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connect(config.get("db"), { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB Cluster1-FYP_Blood Donation...."))
    .catch((error) => console.log(error.message));
module.exports = app;
