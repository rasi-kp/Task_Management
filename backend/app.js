const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();
require("./config/postgreesql")
var logger = require('morgan');
const userRouter = require("./routes/user")
const app = express()

const cors = require('cors')

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', userRouter);


module.exports = app;