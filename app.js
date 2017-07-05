const express = require('express');
const app = express();

const employeeRouter = require('./routers/employees');
const timeclockRouter = require('./routers/timeclock');

const bodyParser = require('body-parser');

const port = 9000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/employees', employeeRouter);
app.use('/timeclock', timeclockRouter);

app.listen(port,function() {
  console.log('Server hearing at ' + port);
});
