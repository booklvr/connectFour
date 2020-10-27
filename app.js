const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const helmet = require('helmet');

const connectDB = require('./config/db');

connectDB();

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const viewRouter = require('./routes/viewRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const lessonRouter = require('./routes/lessonRouter');

// LOAD CONFIG FILES
dotenv.config({ path: '.config/config.env' });

// Passport config
require('./config/passport')(passport);

const app = express();

// For HEROKU secure https requests
app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// serving static files
app.use(express.static(path.join(__dirname, 'dist')));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// limit requests from the same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many request from this IP, please try again in an hour!',
// });
// app.use('/api', limiter);

app.use(cookieParser());

//body parser, reading data from body into req.body
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(
  express.json({
    limit: '10kb',
  })
);

// sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    // proxy: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS attacks
app.use(xss());

// prevent parameter pollution
// ??? NOT SURE WHAT WILL GO HERE YET
// app.use(
//   hpp({
//     whitelist: [
//        'req.parameter.example'
//     ]
//   })
// )

app.use(compression());

// Test Middleware
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   console.log('Middleware test function');
//   next();
// });

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/lessons', lessonRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
