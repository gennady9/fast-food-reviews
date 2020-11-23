const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const config = {
  mongoURL: process.env.MONGODB_URI,
  port: process.env.PORT || 8000
};

// MongoDB Connection
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error) => {
  if (error) {
    console.error('Can\'t connect to mongoose');
    throw error;
  } else {
    console.log('connected to database!');
  }
});

const app = express();

//body parser for json. must be done before API routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); //handle body requests
app.use(cookieParser());

//-----
app.use(express.static(path.join(__dirname, '../../dist')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../dist'))
// })
//-----

// Add backend api routes
fs.readdirSync(__dirname + '/api').forEach((file) => {
  require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
});

app.use(function (err, msg, req, res, next) {
  console.log("route not found..");
  console.error(err.stack);
  res.status(500).json({error: err});
});

app.listen(config.port,
  () => console.log(`Listening on port ${config.port}!`));
