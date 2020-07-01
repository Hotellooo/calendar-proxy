const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const parser = require('body-parser');

const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const serverOne = 'http://localhost:3001';
const serverTwo = 'http://localhost:3002';
const serverThree = 'http://localhost:3003';
const serverFour = 'http://localhost:3004';

app.all('/api/calendar/db/*', (req, res) => {
  console.log('redirecting to Calendar server');
  apiProxy.web(req, res, {target: serverOne, changeOrigin: true});
});

app.all('/api/:hotelID/photos', (req, res) => {
  console.log('redirecting to Photos server');
  apiProxy.web(req, res, {target: serverTwo, changeOrigin: true});
});

app.all('/api/photos/*', (req, res) => {
  console.log('redirecting to About server');
  apiProxy.web(req, res, {target: serverThree, changeOrigin: true});
});


app.all('/reviews/*', (req, res) => {
  console.log('redirecting to Reviews server');
  apiProxy.web(req, res, {target: serverFour, changeOrigin: true});
});

app.use(express.static('public'));

app.listen(port, () => console.log(`Proxy listening on http://localhost:${port}`));

app.use(morgan('dev'));

