const express = require('express');
const router  = express.Router();

/* MiddleWheres */

/* Splash
const splash = (req, res, next)=> {
  res.render("splash");
  setTimeout(function () {    
    res.redirect("index");
  }, 3000);
  //
}*/

/* map */

router.get('/map',(req,res)=>{
  res.render('map');
});


/* GET home page */
router.get('/', /* splash,*/ (req, res, next) => {
  res.render('index');
});

module.exports = router;
