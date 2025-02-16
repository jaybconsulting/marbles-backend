import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import refreshRouter from './routes/refresh.js';
import { expressjwt } from 'express-jwt';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/refresh', refreshRouter);

app.use(expressjwt({
    secret: process.env.ACCESS_TOKEN_SECRET,
    algorithms: ['HS256']
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  const errToSend = req.app.get('env') === 'development' ? err : {};
  
    // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = errToSend;

  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.message, error: errToSend });
});

export default app;