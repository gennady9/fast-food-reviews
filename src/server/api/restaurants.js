const {withAuth} = require('../utils')
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const fs = require('fs');
//import {getDistance} from 'geolib';
//const {getDistance} = require('geolib');
const getDistance = (x,y) => { return 1;}; // Temporary for running the project

const Restaurant = require('../model/restaurant');
const Review = require('../model/review');
const User = require('../model/user');

module.exports = (app) => {
  app.get('/api/restaurant', withAuth, async function (req, res, next) {
    const {id} = req.query;
    const restaurant = await Restaurant.findOne({_id: id});
    if (!restaurant) {
      next('No restaurant.');
    }

    const reviews = await Review.find({restaurant: id}).populate({
      path: 'user',
      model: 'User',
      select: 'username -_id'
    }).sort([['creationTime', -1]]);

    res.json({name: restaurant.name, location: restaurant.location.location, reviews});
    res.end();
  });

  app.get('/api/restaurants', withAuth, async function (req, res, next) {
    const restaurants = await Restaurant.find({});

    res.status(200).json({restaurants});
  });

  app.post('/api/restaurant', [withAuth, upload.single('picture')], async function (req, res, next) {
    const {name, location, lat, lng} = req.body;

    if (!name || !location || !lat || !lng) {
      next('Relevant data is missed.')
    }

    const newRes = new Restaurant({
      name,
      location: {location: location, latitude: Number(lat), longitude: Number(lng)},
    });
    await newRes.save();

    res.json({success: true});
    res.end();
  });

  app.get('/api/restaurant/reviews', withAuth, async function (req, res, next) {
    const {id: restaurantId} = req.query;

    if (!_id) {
      next('Relevant data is missed.')
    }

    const reviews = await Review.find({restaurant: restaurantId});

    res.status(200).json(reviews);
  });

  app.post('/api/restaurant/review', [withAuth, upload.single('picture')], async function (req, res, next) {
    const {restaurant, user, bathroomQuality, staffKindness, cleanliness, driveThruQuality, deliverySpeed, foodQuality} = req.body;

    const userFound = await User.findOne({username: user});
    if (!userFound) {
      next('No user.');
      return;
    }

    const newReview = new Review({
      user: userFound._id,
      creationTime: Date.now(),
      bathroomQuality,
      staffKindness,
      cleanliness,
      driveThruQuality,
      deliverySpeed,
      foodQuality,
      picture: req.file ? {data: fs.readFileSync(req.file.path), contentType: req.file.mimetype} : null,
      restaurant,
    });

    await newReview.save();
    res.json({success: true});
    res.end();
  });

  app.post('/api/restaurants/search', [withAuth, upload.single('picture')], async function (req, res, next) {
    const {name} = req.body;
    const user = await User.findOne({username: req.authenticatedUser});

    const restaurantsRes = await Restaurant.find(
      {name: {"$regex": name, "$options": "i"}});

    const restaurants = await Promise.all(restaurantsRes.map(async (res) => {
      const reviews = await Review.find({restaurant: res._id});
      const total = reviews.reduce((total, rev) =>
        total + rev.bathroomQuality +
        rev.staffKindness +
        rev.cleanliness +
        (rev.driveThruQuality ? rev.driveThruQuality : 0) +
        (rev.deliverySpeed ? rev.deliverySpeed : 0) +
        rev.foodQuality, 0);
      const counter = reviews.reduce((total, rev) => total + 4 + (rev.driveThruQuality ? 1 : 0) + (rev.deliverySpeed ? 1 : 0), 0);

      const distance = getDistance(
        {latitude: user.location.latitude, longitude: user.location.longitude},
        {latitude: res.location.latitude, longitude: res.location.longitude}
      );

      return {
        id: res._id,
        name: res.name,
        location: {location: res.location.location},
        rankAverage: (total ? total / counter : 0),
        distance
      }
    }));

    res.status(200).json({restaurants});
  });

  app.post('/api/restaurants/search/advanced', [withAuth, upload.single('picture')], async function (req, res, next) {
    const user = await User.findOne({username: req.authenticatedUser});

    const query = {};
    if (req.body.nameEnabled === 'true') {
      query.name = {"$regex": req.body.name, "$options": "i"};
    }

    if (req.body.locationEnabled === 'true') {
      query['location.location'] = {"$regex": req.body.location, "$options": "i"};
    }

    const restaurantsRes = await Restaurant.find(
      query);

    const restaurants = await Promise.all(restaurantsRes.map(async (res) => {
      const reviews = await Review.find({restaurant: res._id});
      const total = reviews.reduce((total, rev) =>
        total + rev.bathroomQuality +
        rev.staffKindness +
        rev.cleanliness +
        (rev.driveThruQuality ? rev.driveThruQuality : 0) +
        (rev.deliverySpeed ? rev.deliverySpeed : 0) +
        rev.foodQuality, 0);
      const counter = reviews.reduce((total, rev) => total + 4 + (rev.driveThruQuality ? 1 : 0) + (rev.deliverySpeed ? 1 : 0), 0);

      const distance = getDistance(
        {latitude: user.location.latitude, longitude: user.location.longitude},
        {latitude: res.location.latitude, longitude: res.location.longitude}
      );

      return {
        id: res._id,
        name: res.name,
        location: {location: res.location.location},
        rankAverage: (total ? total / counter : 0),
        distance
      }
    }));
    res.status(200).json({restaurants: restaurants.filter(o => o.rankAverage > Number(req.body.rankAbove))});
  });
};
