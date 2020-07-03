const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const parser = require('body-parser');

const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
// const serverOne = 'http://localhost:3001';
// const serverTwo = 'http://localhost:3002';
// const serverThree = 'http://localhost:3003';
// const serverFour = 'http://localhost:3004';
const serverOne = 'http://ec2-3-17-163-130.us-east-2.compute.amazonaws.com/';
const serverTwo = 'http://ec2-18-217-154-181.us-east-2.compute.amazonaws.com/';
const serverThree = 'http://ec2-54-241-67-8.us-west-1.compute.amazonaws.com/';
const serverFour = 'http://ec2-13-57-249-34.us-west-1.compute.amazonaws.com/reviews/';

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

