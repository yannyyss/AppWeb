const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const Place = require('../models/Place');

function isAuth(req, res, next) {
	if (req.isAuthenticated()) return res.redirect('/map');
	return next();
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	return res.redirect('/login?next=/map');
}
/* map */

router.get('/',isLoggedIn,(req,res)=>{
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

router.get('/test', (req,res)=>{
	if(Object.keys(req.query).length > 0){
		console.log(Object.keys(req.query)); //imprime la llave de query
		Place.find({tipodelugar: { $in: Object.keys(req.query) } //Busca en todos las instacias que se han creado con el modelo Place, el query que conincida con la key
		}).then(items => {
		res.json(items); //muestra un json en el navegador
		});
	}
	//res.send("no hay querys mijo")
})

module.exports = router;
