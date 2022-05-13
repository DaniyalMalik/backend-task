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
  userRoutes = require('./routes/user'),
  todoRoutes = require('./routes/todo');

dotenv.config({ path: 'config/.env' });

app.use(cors());
app.use(mongoSanitize());
app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api/user', userRoutes);
app.use('/api/todo', todoRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log(
    `Server started running in ${process.env.NODE_ENV} mode on PORT ${
      process.env.PORT || 5000
    }`.blue.bold,
  ),
);

connectDB();
