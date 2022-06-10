const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const cors = require('cors')
const bookingRoute = require('./routes/booking')
const garageRoute = require('./routes/garage')
const expressOasGenerator = require('express-oas-generator');
var app = express()
expressOasGenerator.init(app, {});
connectDB

app.use(bodyParser.urlencoded({
  extended: false,
}))

app.use(cors())
app.use(bodyParser.json())
app.use(bookingRoute)
app.use(garageRoute)

process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port" + port))