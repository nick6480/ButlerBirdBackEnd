var express = require('express');
var router = express.Router();


const {Company} = require("../models/companys");


// Display data on Butlerbird
router.get('/company/get', function(req, res, next) { // GET Company data
  Company.findOne({'butlerbird.url' : req.hostname}, function (err, company) {
    if(err) console.log(err);
    if(company) {
        let obj = {
          name: company.company,
          address: company.address,
          city: company.city,
          country: company.country
        }

      res.json(obj);
    }
  })
  res.status(200)
});



router.get('/settings/get', function(req, res, next) {// Get the default settings
  Company.findOne({'butlerbird.url' : req.hostname}, function (err, company) {
    if(err) console.log(err);
    if(company) {

      console.log(company.defaultsettings);

      res.json(company.defaultsettings);
    }
  })


  res.status(200)
});



router.get('/img/:id/:catid/:boxid/:type', function(req, res, next) {

    Company.findOne({_id : req.params.id}, function (err, company) {

    if(err) console.log(err);
    if(company) {

      for (var i = 0; i < company.butlerbird.content.categorys.length; i++) {
        if (company.butlerbird.content.categorys[i].category.catid == req.params.catid) {
          for (var o = 0; o < company.butlerbird.content.categorys[i].category.content.length; o++) {
            if (company.butlerbird.content.categorys[i].category.content[o]._id == req.params.boxid) {
              if (req.params.type == 'preview') {
                if (company.butlerbird.content.categorys[i].category.content[o].preview.img) {
                  res.contentType(company.butlerbird.content.categorys[i].category.content[o].preview.img.contentType);
                  res.send(company.butlerbird.content.categorys[i].category.content[o].preview.img.data);
                }
              } else if (req.params.type == 'page') {
                  if (company.butlerbird.content.categorys[i].category.content[o].page.img) {
                    res.contentType(company.butlerbird.content.categorys[i].category.content[o].page.img.contentType);
                    res.send(company.butlerbird.content.categorys[i].category.content[o].page.img.data);
                  }

              }


            }
          }
        }
      }

    }
  })
})















module.exports = router;
