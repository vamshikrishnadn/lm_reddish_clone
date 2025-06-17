const express = require('express');
require('express-async-errors');
const cors = require('cors');
const middleware = require('./utils/middleware');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const subredditRoutes = require('./routes/subreddit');
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
  res.status(200).send('<h1>workingg</h1>');
});

app.use('/api', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/subreddits', subredditRoutes);
app.use('/api/users', userRoutes);

app.use(middleware.unknownEndpointHandler);
app.use(middleware.errorHandler);

app.use(express.static(__dirname + '/client'));
app.use(express.static('client/build'));
app.get('*', (req, res) => {
  console.log('hererer');
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

module.exports = app;
