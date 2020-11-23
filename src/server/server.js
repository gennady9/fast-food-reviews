const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
// const Country = require('./model/country');
// const Restaurant = require('./model/restaurant');
// const Reviews = require('./model/reviews');


const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');

const config = {
  mongoURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/reviews',
  port: process.env.PORT || 8000
};

//setup database

// mongodb+srv://gennady9:<password>@cluster0.mng8u.mongodb.net/<dbname>?retryWrites=true&w=majority

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://gennady9:45214521@cluster0.mng8u.mongodb.net/fast-food-reviews?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// const mongoose = require('mongoose');


const connection = "mongodb+srv://gennady9:45214521@cluster0.mng8u.mongodb.net/fast-food-reviews?retryWrites=true&w=majority";
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));

// mongoose.Promise = global.Promise;
// // MongoDB Connection
// if (process.env.NODE_ENV !== 'test') {
//   mongoose.connect(config.mongoURL, {useNewUrlParser: true}, (error) => {

//     if (error) {
//       console.error('Please make sure Mongodb is installed and running!');
//       throw error;
//     } else {
//       console.log('connected to database!');
//     }
//   });
// }

const app = express();

//body parser for json. must be done before API routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); //handle body requests
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//-----
// app.use(cors());
// app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, '../../dist')))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../dist'))
// })
//-----

// Add backend api routes
fs.readdirSync(__dirname + '/api').forEach((file) => {
  require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
});

app.use(function (err, msg, req, res, next) {
  console.log("route not found pikachu");
  console.error(err.stack);
  res.status(500).json({error: err});
});

app.listen(config.port || 8000,
  () => console.log(`Listening on port ${process.env.PORT || 8000}!`));
