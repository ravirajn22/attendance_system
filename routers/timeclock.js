const express = require('express');
const moment = require('moment');
var router = express.Router();

var pgp = require('pg-promise')(/*options*/);
var db = pgp('postgres://postgres:postgres@localhost:5432/userdb');

router.post('/clockin',function(req,res) {
  let start_time = moment().format();
  let emp_id = 33;
  let in_latitude = req.body.in_latitude;
  let in_longitude = req.body.in_longitude;

  db.one('INSERT INTO timesheets(start_time,emp_id,in_latitude,in_longitude) VALUES($1,$2,$3,$4) RETURNING id,start_time,in_latitude,out_latitude',[start_time,emp_id,in_latitude,in_longitude])
    .then((data) => {
      console.log('Clocked in');
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log('ERROR:', error);
      res.status(400).json({message:error.detail});
    });
});

router.post('/clockout',function(req,res) {
  let end_time = moment().format();
  let out_latitude = req.body.out_latitude;
  let out_longitude = req.body.out_longitude;
  let id = req.body.id;

  db.none('UPDATE timesheets SET end_time=$1,out_latitude=$2,out_longitude=$3 WHERE id=$4',[end_time,out_latitude,out_longitude,id])
    .then(() => {
      console.log('Clocked out');
      res.status(200).json({message:'Clocked out'});
    })
    .catch((error) => {
      console.log('ERROR:', error);
      res.status(400).json({message:error.detail});
    });
});

router.get('/status',function(req,res) {
  let emp_id = 33;
  db.oneOrNone('SELECT * FROM timesheets WHERE end_time IS NULL and emp_id=$1 LIMIT 1',[emp_id])
    .then((data) => {
      console.log('status checked');
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log('ERROR:', error);
      res.status(400).json({message:error.detail});
    });
});

module.exports = router;
