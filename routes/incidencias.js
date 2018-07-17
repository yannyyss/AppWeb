const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    return res.redirect('/login?next=/profile')
}

router.post('/new', isLoggedIn, (req, res, next) => {
    req.body.user = req.user._id;
    console.log(req.body.user);
    /*Tweet.create(req.body)
        .then(tweet => {
            res.redirect('/profile')
        })
        .catch(e => next(e))*/
});



module.exports = router;