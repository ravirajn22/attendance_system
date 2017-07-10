const express = require('express');
const moment = require('moment');
var router = express.Router();

var pgp = require('pg-promise')(/*options*/);
var db = pgp('postgres://postgres:postgres@localhost:5432/userdb');

// app.use('/mytimesheet', timesheetRouter);
router.get('/mytimesheet',function(req,res) {
  let emp_id = 8;
  let start_time = req.query.start_time;
  let end_time = req.query.end_time;
  if(!start_time || !end_time) {
    start_time = moment().startOf('week');
    end_time = moment().endOf('week');
  }
  db.any('SELECT * FROM timesheets WHERE emp_id=$1 AND start_time BETWEEN $2::timestamp AND $3::timestamp',[emp_id,start_time,end_time])
    .then((data) => {
      console.log('timesheet retreived');
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log('ERROR:', error);
      res.status(400).json({message:error.detail});
    });
});

router.get('/alltimesheets',function(req,res) {
  // let emp_id = 8;
  let start_time = req.query.start_time;
  let end_time = req.query.end_time;
  if(!start_time || !end_time) {
    start_time = moment().startOf('week');
    end_time = moment().endOf('week');
  }
  let q = 'SELECT emp_id,first_name,minutes_worked from employees e INNER JOIN (SELECT emp_id,SUM(EXTRACT(EPOCH FROM (end_time - start_time)))/60 AS minutes_worked FROM timesheets WHERE start_time BETWEEN $1::timestamp AND $2::timestamp GROUP BY timesheets.emp_id) t ON t.emp_id = e.id ORDER BY first_name'
  db.any(q,[start_time,end_time])
    .then((data) => {
      console.log('timesheet retreived');
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log('ERROR:', error);
      res.status(400).json({message:error.detail});
    });
});

router.get('/alltimesheets/:empId',function(req,res) {
  let emp_id = req.params.empId
  let start_time = req.query.start_time;
  let end_time = req.query.end_time;
  if(!start_time || !end_time) {
    start_time = moment().startOf('week');
    end_time = moment().endOf('week');
  }
  let q = 'SELECT * FROM timesheets WHERE emp_id=$1 AND start_time BETWEEN $2::timestamp AND $3::timestamp';
  db.any(q,[emp_id,start_time,end_time])
    .then((data) => {
      console.log('timesheet retreived');
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log('ERROR:', error);
      res.status(400).json({message:error.detail});
    });
});

module.exports = router;
