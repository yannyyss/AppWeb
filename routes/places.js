const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const Place = require('../models/Place')

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	return res.redirect('/login?next=/map');
}

router.post('/new', isLoggedIn, (req, res, next) => {
    req.body.user = req.user._id;
    Place.create(req.body)
    .then(place=>{
        console.log(place)
        res.redirect('/map')
    })
    .catch(e=>next(e))
});

module.exports = router;
