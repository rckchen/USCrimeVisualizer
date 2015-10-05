var express = require('express');
var router = express.Router();
var connection = require('../connection')
var fs = require('fs');

/* GET Crimes through api/events */
router.get('/', function (req, res, next) {
  // query DB for everything
  // will return you all the events in the database
  connection(function (db) {

    db.collection('allCrimes').find().toArray(function(err, results) {
/* Temporarily commented out - this code block only used to generate zip code data. Only needs to be run once. 
    db.collection('crimes').find({}, {X:1, Y:1, Time:1, Category:1, Descript:1, Address:1}).toArray(function(err, results) {

      var data = JSON.stringify(results);

      // Write file to local filesystem to be used to append zipcode data to dataset
      fs.writeFile( __dirname + "/../utilities/data.json", data, function(err) {

          if(err) {
              return console.log(err);
          }

          console.log("The file was saved!");
          res.send(JSON.stringify(results));
      }); 
    });
  })
});
*/
      res.send(JSON.stringify(results));
    });
  });
});

router.get('/date=:date', function (req, res, next) {
  // data is an object with year and month as variables
  // will return three months of crime starting from the year month combination specified in url
  var data = req.params.date.split('-');
  var year = +data[0];
  var month = +data[1];
  var rollover = 0;
  if(month > 10) {
    rollover = 1;
  }
  var search = [
<<<<<<< HEAD
    { Date: new RegExp('.*' + month + '\/.*\/' + year)}
  ]

  connection(function (db) {
    db.collection('allCrimes').find({$or: search}).toArray(function (err, results) {
=======
    // cray regex stuff
    { Date: new RegExp('.*' + month + '\/.*\/' + year)},
    { Date: new RegExp('.*' + (month + 1)%12 + '\/.*\/' + (+year+rollover))},
    { Date: new RegExp('.*' + (month + 2)%12 + '\/.*\/' + (+year+rollover))}
  ];

  connection(function (db) {
    // here we use search varable to correctly query db for 3 months
    db.collection('allCrimes').find({$or: search}).toArray(function(err, results) {
>>>>>>> 71b9bd1087810400078ef3f09868012de0add44c
      res.send(JSON.stringify(results));
    });
  });
});

module.exports = router;