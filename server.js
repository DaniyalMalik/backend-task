const express = require('express'),
  app = express(),
  dotenv = require('dotenv'),
  cors = require('cors'),
  connectDB = require('./config/db'),
  colors = require('colors'),
  morgan = require('morgan'),
  xss = require('xss-clean'),
  helmet = require('helmet'),
  hpp = require('hpp'),
  mongoSanitize = require('express-mongo-sanitize'),
  PORT = process.env.PORT || 5000,
  ENVIRONMENT = process.env.NODE_ENV;

dotenv.config({ path: 'config/.env' });

app.use(cors());
app.use(mongoSanitize());
app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.listen(PORT, () =>
  console.log(
    `Server started running in ${ENVIRONMENT} mode on PORT ${PORT}`.blue.bold,
  ),
);

connectDB();
