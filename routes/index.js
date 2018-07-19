const express = require('express');
const router  = express.Router();

/* MiddleWheres */

/* map */
/*
router.get('/map',(req,res)=>{
  res.render('map');
});
*/

/* GET home page */
router.get('/', /* splash,*/ (req, res, next) => {
  res.render('index');
});

module.exports = router;
