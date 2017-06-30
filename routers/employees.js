const express = require('express');
var router = express.Router();

var pgp = require('pg-promise')(/*options*/);
var db = pgp('postgres://postgres:postgres@localhost:5432/userdb');

router.get('/', function(req, res) {
  db.any('SELECT * FROM employees')
     .then(function (data) {
       res.json(data);
     })
     .catch(function (error) {
       console.log('ERROR:', error)
     })
});

router.get('/:employeeId', function(req, res) {
  db.oneOrNone('SELECT * FROM employees WHERE id=$1',[req.params.employeeId])
     .then(function (data) {
       res.json(data);
     })
     .catch(function (error) {
       console.log('ERROR:', error)
     })
});

router.post('/', function(req,res) {
  db.none('INSERT INTO employees(first_name,work_email,mobile) VALUES($1,$2,$3)',[req.body.first_name,req.body.work_email,req.body.mobile])
    .then(() => {
      console.log('insert success');
      res.status(200).json({message:'employee added'});
    })
    .catch((error) => {
      console.log('ERROR:', error);
      res.status(400).json({message:error.detail});
    });
})

router.put('/:employeeId', function(req,res) {
  db.none('UPDATE employees SET(first_name,work_email,mobile)=($2,$3,$4) WHERE employees.id=$1',[req.params.employeeId,req.body.first_name,req.body.work_email,req.body.mobile])
    .then(() => {
      console.log('insert success');
    })
    .catch((error) => {
      console.log('ERROR:', error);
    });
})

module.exports = router;
