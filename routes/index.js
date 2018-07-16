const express = require('express');
const router  = express.Router();

/* MiddleWheres */

/*
const splash = (req, res, next)=> {
  res.render("splash");
  setTimeout(function () {    
    res.redirect("index");
  }, 3000);
  //
}*/

/* GET home page */
router.get('/', /* splash,*/ (req, res, next) => {
  res.render('index');
});

module.exports = router;
