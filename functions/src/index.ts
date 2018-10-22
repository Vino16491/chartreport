import * as functions from 'firebase-functions';
import express = require("express");
import bodyParser = require("body-parser");

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript


const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get('/',(req, res) =>{
    res.status(200).json({chartreportapi:'works'});
})
exports.chartreportapi = functions.https.onRequest(app)
