const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
}));

// Routes
app.get('/', (_, res) => {
  res.send('Willkommen in der Pollack REST-API!');
});

const poll = require('./routes/poll');
app.use('/poll', poll);

const vote = require('./routes/vote');
app.use('/vote', vote);



// Start Server
const port = process.env.PORT || 49712; // später ändern zu 49712
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
