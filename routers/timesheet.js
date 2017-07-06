const express = require('express');
const moment = require('moment');
var router = express.Router();

var pgp = require('pg-promise')(/*options*/);
var db = pgp('postgres://postgres:postgres@localhost:5432/userdb');

// app.use('/mytimesheet', timesheetRouter);
router.get('/',function(req,res) {
  let emp_id = 33;

  db.any('SELECT * FROM timesheets WHERE emp_id=$1',[emp_id])
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
