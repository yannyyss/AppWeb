const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const Place = require('../models/Place');

function isAuth(req, res, next) {
	if (req.isAuthenticated()) return res.redirect('/login');
	return next();
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	return res.redirect('/login?next=/map');
}
/* map */

router.get('/map',isAuth,(req,res)=>{
    res.render('map');
  });

router.post('/new', isLoggedIn, (req, res, next) => {
	req.body.user = req.user._id;
	Place.create(req.body)
		.then((place) => {
            console.log(place)
			User.findByIdAndUpdate(req.user._id, { $push: { places: place._id } },{ new: true }).then((user)=>{console.log(user)}).catch((e) => next(e));
			res.redirect('/map');
		})
		.catch((e) => next(e));
});

module.exports = router;
