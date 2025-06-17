const express = require('express');
const path = require('path'); // <-- add this
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

// Serve static files from React
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/test', (req, res) => {
  res.status(200).send('<h1>workingg</h1>');
});

app.get('/test', (req, res) => {
  res.status(200).send('updteeeeee');
});

app.use('/api', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/subreddits', subredditRoutes);
app.use('/api/users', userRoutes);

app.use(middleware.unknownEndpointHandler);
app.use(middleware.errorHandler);

// React frontend fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

module.exports = app;
