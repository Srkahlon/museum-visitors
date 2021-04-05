const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

require('./src/routes/apiRoutes.js')(app);

module.exports = app;