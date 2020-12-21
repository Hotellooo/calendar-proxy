const express = require('express');
const path = require('path');
const app = express();
const httpProxy = require('http-proxy');
const port = 3000;
const apiProxy = httpProxy.createProxyServer();
const morgan = require('morgan');

// DEPLOYED:
const calendarServer = 'http://ec2-3-17-163-130.us-east-2.compute.amazonaws.com/';
const photosServer = 'http://ec2-13-58-165-251.us-east-2.compute.amazonaws.com/';
const aboutServer = 'http://ec2-18-144-17-19.us-west-1.compute.amazonaws.com/';
const reviewsServer = 'http://ec2-54-183-225-89.us-west-1.compute.amazonaws.com/';

// LOCAL TESTING:
// const calendarServer = 'http://localhost:3001/';
// const photosServer = 'http://localhost:3002/';
// const aboutServer = 'http://localhost:3003/';
// const reviewsServer = 'http://localhost:3003/';

app.use(morgan('dev'));

app.all('/api/calendar/hotels/*', (req, res) => {
  console.log('redirecting to Calendar server');
  apiProxy.web(req, res, {target: calendarServer, changeOrigin: true});
});

app.all('/api/calendar/update/', (req, res) => {
  console.log('redirecting to calendar server');
  apiProxy.web(req, res, {target: calendarServer, changeOrigin: true});
});

app.all('/api/:hotelID/photos', (req, res) => {
  console.log('redirecting to Photos server');
  apiProxy.web(req, res, {target: photosServer, changeOrigin: true});
});

app.all('/api/photos/*', (req, res) => {
  console.log('redirecting to About server');
  apiProxy.web(req, res, {target: aboutServer, changeOrigin: true});
});


app.all('/reviews/*', (req, res) => {
  console.log('redirecting to reviews server');
  apiProxy.web(req, res, {target: reviewsServer, changeOrigin: true});
});

app.use(express.static('public'));

app.listen(port, () => console.log(`Proxy listening on http://localhost:${port}`));


