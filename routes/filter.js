const express = require('express');
const router = express.Router();
const Place = require('../models/Place');

/* Ejemplo:
router.get('/map', (req, res) => {
    console.log(req.query)
    if (Object.keys(req.query).length > 0) {
        console.log(Object.keys(req.query)); //imprime la llave de query
        Place.find({
            tipodelugar: { $in: Object.keys(req.query) } //Busca en todos las instacias que se han creado con el modelo Place, el query que conincida con la key
        }).then(items => {
            res.json(items); //muestra un json en el navegador
        });
    }
    res.send("no hay querys mijo") //Este es un else
})

module.exports = router;
*/
/*
router.get('/map', (req, res) => {
    console.log(req.query.filter) //imprime la ruta de query
        Place.find({
            tipodelugar: req.query.filter //utiliza una variable filter en la ruta para hacer el filtro
        }).then(items => {
        console.log('lositems', items) //imprime el array en la consola
        items = JSON.stringify(items); //convierte el array a String
        res.render('pruebita', { items }); //muestra un json en el navegador
        });
})

module.exports = router;
*/
router.get('/map', (req, res) => {
    if (Object.keys(req.query).length > 0) {
        console.log(Object.keys(req.query)); //imprime la llave de query
        Place.find({ tipodelugar: { $in: Object.keys(req.query)}}) //Busca en todos las instacias que se han creado con el modelo Place, el query que conincida con la key
        .then(items => {
        items = JSON.stringify(items); //convierte el array a String
        console.log("esto es raro", items);
        res.render('map', {items}); //muestra un json en el navegador
        });
    } else {
        res.render('map'); //Else, muestra el mapa
    }
})
module.exports = router;