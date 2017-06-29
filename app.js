const express = require('express');
const app = express();
var employeeRouter = require('./routers/employees');
var bodyParser = require('body-parser');

var port = 9000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/employees', employeeRouter);

app.listen(port,function() {
  console.log('Server hearing at ' + port);
});
