const jwt = require('jsonwebtoken');
const User = require('../model/user');
const Review = require('../model/review');
const fs = require('fs');
const {withAuth} = require('../utils')
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const {secret} = require('../constants');

module.exports = (app) => {
  app.post('/api/register', upload.single('picture'), async function (req, res, next) {
      const {username, password, location, lat, lng} = req.body;

      if (!username || !location || !password) {
        next('Relevant data is missed.')
      }

      const user = await User.findOne({username});

      if (user) {
        next('User already exists.');
        return;
      }

      const newUser = new User({
        username,
        password,
        location: {location: location, latitude: Number(lat), longitude: Number(lng)},
        picture: req.file ? {data: fs.readFileSync(req.file.path), contentType: req.file.mimetype} : null
      });

      await newUser.save();
      res.json({success: true});
      res.end();
    }
  );

  app.post('/api/login', async function (req, res, next) {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (!user) {
      next('Incorrect email or password.');
      return;
    }
    user.isCorrectPassword(password, (err, same) => {
      if (err) {
        next('Internal error please try again.');
      } else if (!same) {
        next('Incorrect email or password.');
      } else {
        // Issue token
        const payload = {username};
        const token = jwt.sign(payload, secret, {
          expiresIn: '1h'
        });
        res.cookie('token', token, {httpOnly: true}).status(200).json({success: true});
      }
    });
  });

  app.get('/api/logout', function (req, res, next) {
    res.status(200).clearCookie('token').json({});
  });

  app.get('/api/checkToken', withAuth, async function (req, res) {
    const user = await User.findOne({username: req.authenticatedUser});

    res.status(200).json({username: req.authenticatedUser, userId: user ? user._id : null});
  });

  app.get('/api/exists', async function (req, res) {
    const {username} = req.query;
    const user = await User.findOne({username});

    res.status(200).json({exists: !!user});
  });

  app.post('/api/users/search', [withAuth, upload.single('picture')], async function (req, res, next) {
    const query = {};
    if (req.body.nameEnabled === 'true') {
      query.username = {"$regex": req.body.name, "$options": "i"};
    }

    if (req.body.locationEnabled === 'true') {
      query['location.location'] = {"$regex": req.body.location, "$options": "i"};
    }

    const users = await User.find(
      query);

    res.status(200).json({
      users: users.map(user => ({
        id: user._id,
        username: user.username,
        location: user.location ? user.location.location : ''
      }))
    });
  });

  app.get('/api/user', withAuth, async function (req, res) {
    const user = await User.findOne({_id: req.query.userId});
    const reviews = await Review.find({user: req.query.userId}).populate({
      path: 'restaurant',
      model: 'Restaurant',
      select: 'name -_id'
    }).sort([['creationTime', -1]]);

    res.status(200).json({name: user.username, picture: user.picture, location: user.location.location, reviews});
  });

  app.post('/api/review/edit', [withAuth, upload.single('picture')], async function (req, res, next) {
    const {reviewId, bathroomQuality, staffKindness, cleanliness, driveThruQuality, deliverySpeed, foodQuality} = req.body;

    const review = await Review.findOne({_id: reviewId}).populate({
      path: 'user',
      model: 'User',
      select: 'username -_id'
    });

    if (review.user.username != req.authenticatedUser) {
      next('Authorization error.')
      return;
    }

    review.bathroomQuality = bathroomQuality;
    review.staffKindness = staffKindness;
    review.cleanliness = cleanliness;
    review.driveThruQuality = driveThruQuality;
    review.deliverySpeed = deliverySpeed;
    review.foodQuality = foodQuality;
    review.picture = req.file ? {data: fs.readFileSync(req.file.path), contentType: req.file.mimetype} : null;

    await review.save();

    res.status(200).json({});
  });

  app.post('/api/user/name', [withAuth, upload.single('picture')], async function (req, res, next) {
    const {name} = req.body;

    const existingUser = await User.findOne({name});
    if (existingUser) {
      next('Name in use');

      return;
    }

    const user = await User.findOne({username: req.authenticatedUser});

    user.username = name;

    await user.save();

    res.status(200).json({id: user._id});
  });

  app.post('/api/user/location', [withAuth, upload.single('picture')], async function (req, res, next) {
    const {location, lat, lng} = req.body;

    const user = await User.findOne({username: req.authenticatedUser});

    user.location = {location: location, latitude: Number(lat), longitude: Number(lng)};

    await user.save();

    res.status(200).json({});
  });

  app.get('/api/review/delete', withAuth, async function (req, res, next) {
    const {id} = req.query;

    const review = await Review.findOne({_id: id}).populate({
      path: 'user',
      model: 'User',
      select: 'username -_id'
    });

    if (review.user.username != req.authenticatedUser) {
      next('Authorization error.')
      return;
    }

    await Review.deleteOne({_id: id});

    const reviews = await Review.find({user: req.query.userId}).populate({
      path: 'restaurant',
      model: 'Restaurant',
      select: 'name -_id'
    }).sort([['creationTime', -1]]);

    res.status(200).json({reviews});
  });
}
;
