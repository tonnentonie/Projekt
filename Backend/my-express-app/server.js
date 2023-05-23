const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:49713',
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Routes
app.get('/test', (_, res) => {
  res.send('Willkommen in der Pollack REST-API!');
});

const poll = require('./routes/poll');
app.use('/poll', poll);

const vote = require('./routes/vote');
app.use('/vote', vote);

const user = require('./routes/user');
app.use('/user', user);

const polllock = require('./routes/pollock/poll');
app.use('/poll', polllock);

const votelock = require('./routes/pollock/vote');
app.use('/vote', votelock);



// Start Server
const port = process.env.PORT || 49712; // später ändern zu 49712
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
