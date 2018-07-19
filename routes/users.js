const router = require("express").Router();
const User = require("../models/User");

//Ejemplo de bliss:
router.get('/users/:id', (req, res, next) => {
    User.findById(req.params.id)
        .populate('tweets')
        .populate('followers')
        .then(user => {
            if (!user) res.redirect('/users');
            console.log(user.followers)
            //checo si lo sigues
            const elId = req.user.following.find(i => i == user._id.toString())
            const text = elId ? "Following" : "Follow";
            user.text = text;
            res.render('users/profile', user)
        })
        .catch(e => next(e))
})


module.exports = router;