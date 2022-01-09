var express = require('express');
var router = express.Router();
const {Company} = require("../models/companys");
const {authUser, authUserBool} = require("../private/auth");


router.get('/', authUser, function(req, res, next) {

  Company.findOne({_id: req.user.company}, function (err, company) {
    if(err) console.log(err);
    if(company) {
      res.locals.isAuthenticated = authUserBool(req, res);
      res.locals.buisness = company.business;

      res.render('styling', { title: 'Styling' });
    }
  })


});

module.exports = router;
