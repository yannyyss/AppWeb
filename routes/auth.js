const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const sendActivationLink = require('../helpers/mailer').sendActivationLink;
const bcrypt = require('bcrypt');
const Place = require('../models/Place');

const errDict = {
	UserExistsError: 'Este usuario ya existe'
};

function isAuth(req, res, next) {
	if (req.isAuthenticated()) return res.redirect('/map');
	return next();
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	return res.redirect('/login');
}
router.get('/confirm/:confirmCode', (req, res) => {
	const code = req.params.confirmationCode;
	User.findOneAndUpdate(code, { active: true }, { new: true }).then(() => {
		res.send('Tu cuenta está activa');
		//res.redirect('auth/site');
	});
});

/* router.get('/map', (req, res) => {
	Place.find()
		.then((items) => {
			items = JSON.stringify(items); //convierte el array a String
			console.log('esto es raro', items);
			res.render('map', { items }); //muestra un json en el navegador
		});
}); */

router.get('/signup', (req, res, next) => {
	res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
	if (req.body.password !== req.body.password2) {
		req.body.err = 'Tu password no coincide';
		res.render('auth/signup', req.body);
	}
	const hash = bcrypt.hashSync(req.body.email, bcrypt.genSaltSync(10)).split('/');
	req.body.confirmationCode = hash;
	User.register(req.body, req.body.password)
		.then((user) => {
			//activation link
			sendActivationLink(user);
			//loguearlo automaticamente
			res.redirect('/login');
		})
		.catch((e) => {
			req.body.err = errDict[e.name];
			res.render('auth/signup', req.body);
		});
});

router.get('/login', isAuth, (req, res, next) => {
	res.render('auth/login', { next: req.query.next });
});

router.post('/login', passport.authenticate('local',{
	successRedirect:'/',
	failureRedirect:'/login'
}), (req, res, next) => {
	if (req.body.next) res.redirect(req.body.next);
	req.app.locals.loggedUser = req.user;
	res.redirect('/map');
	
});

router.get('/logout', (req, res, next) => {
	req.logout();
	res.redirect('/login');
});

module.exports = router;
