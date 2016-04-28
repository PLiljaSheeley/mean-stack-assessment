var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/heroes');

router.get('/', function(req, res) {
  var myPath = path.join(__dirname + '/../public/views/index.html')
  res.sendFile(myPath);
})

router.get('/heroes', function(request, response, next){
   return Hero.find({}).exec(function(err, heroes){
       if(err) throw new Error(err);
       response.send(JSON.stringify(heroes));
       next();
   });
});

router.post('/add', function(request, response, next){
   var heroRequest = new Hero({alias: request.body.alias,
    first_name:request.body.first_name,
    last_name:request.body.last_name,
    city:request.body.city,
    power_name:request.body.power_name});
      heroRequest.save(function(err){
         if(err) console.log('error', err);
         response.send(heroRequest.toJSON());
         next();
     });
});

router.delete("/deleteHero/:id", function(request, response) {
  console.log("delete id", request.params.id);
  console.log("request", request);
  Hero.findOneAndRemove({_id: request.params.id}, function(err, hero){
    if (err){
      console.log(err);
      response.sendStatus(500);
    } else {
      console.log('Deleted hero:', hero);
      response.sendStatus(200);
    }
  });
});


var Hero = mongoose.model('Hero', {alias:String,
first_name:String,
last_name:String,
city:String,
power_name:String});
module.exports = router;