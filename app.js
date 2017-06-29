const express = require('express');
var pgp = require('pg-promise')(/*options*/)
var db = pgp('postgres://postgres:postgres@localhost:5432/userdb')

const app = express()

app.get('/', function (req, res) {
  db.one('SELECT * FROM employees WHERE id=$1',1)
    .then(function (data) {
      console.log('DATA:', data.first_name)
    })
    .catch(function (error) {
      console.log('ERROR:', error)
    })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
