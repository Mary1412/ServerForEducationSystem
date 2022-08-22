const express = require("express");
const fs = require("fs");

const Rout = require('./router/rout.js')

const app = express();
const jsonParser = express.json();

app.use(Rout)
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.listen(3000, function() {
  console.log("Server started");
});



