const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const Country = require('./model/country');
const Restaurant = require('./model/restaurant');
// const Reviews = require('./model/reviews');


const {resolve} = require('path');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');

const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/reviews',
  port: 8000
};

//setup database
mongoose.Promise = global.Promise;
// MongoDB Connection
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(config.mongoURL, {useNewUrlParser: true}, (error) => {
    // const countries = require(`${__dirname}/countries.json`);
    // Country.collection.deleteMany({})
    //   .then(result => Country.collection.insertMany(countries));
    // const restaurants = require(`${__dirname}/restaurants.json`);
    // Restaurant.collection.deleteMany({})
    //   .then(result => Restaurant.collection.insertMany(restaurants));
    // const reviews = require(`${__dirname}/reviews.json`);
    // Reviews.collection.deleteMany({})
    //   .then(result => Reviews.collection.insertMany(reviews));

    if (error) {
      console.error('Please make sure Mongodb is installed and running!');
      throw error;
    } else {
      console.log('connected to database!');
    }
  });
}

const app = express();

//body parser for json. must be done before API routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); //handle body requests
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add backend api routes
fs.readdirSync(__dirname + '/api').forEach((file) => {
  require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
});

app.use(function (err, msg, req, res, next) {
  console.error(err.stack);
  res.status(500).json({error: err});
});

app.listen(config.port || 8000,
  () => console.log(`Listening on port ${process.env.PORT || 8000}!`));
