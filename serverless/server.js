const express = require('express');
const cors = require('cors');
const morgan  = require('morgan');
const app = express();
const serverless = require('serverless-http');
const routes = require('./routes');

app.use(cors());
app.use(morgan('combined'));

// mount routes
app.use('/api/v1', routes);
app.use('/.netlify/functions/server', routes);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
