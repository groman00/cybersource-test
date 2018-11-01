require('dotenv').config()

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const getKey = require('./key');
const app = express();
const port = 3000;
const viewsDir = path.join(__dirname, './views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'))

/**
 * GET Vanilla Demo Page
 */
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: viewsDir });
});

/**
 * GET React Demo Page
 */
app.get('/react', (req, res) => {
  res.sendFile('react.html', { root: viewsDir });
});

/**
 * GET Token Service
 */
app.get('/key', (req, res) => {
  getKey({
    targetOrigin: `http://localhost:${port}`
  })
  .then((key) => {
    res.json(key);
  })
  .catch((e) => {
    console.log('Error', e);
    res.json({});
  })
});

/**
 * POST Payment
 */
app.post('/payment', (req, res) => {
  const { token } = req.body;

  // Use flex.verifyToken
  // Then do something with the token.
  console.log(token);
  res.send('ok');
});

/**
 * Start Server
 */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});


