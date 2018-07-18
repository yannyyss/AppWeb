const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const Place = require('../models/Place');

router.get('/map', (req, res) => {
    if (Object.keys(req.query).length > 0) {
        console.log(Object.keys(req.query)); //imprime la llave de query
        Place.find({
            tipodelugar: { $in: Object.keys(req.query) } //Busca en todos las instacias que se han creado con el modelo Place, el query que conincida con la key
        }).then(items => {
            console.log(items)
            items = JSON.stringify(items);
            //res.json(items);
            res.render('pruebita',{items}); //muestra un json en el navegador
        });
    }
    //res.send("no hay querys mijo")
})

module.exports = router;