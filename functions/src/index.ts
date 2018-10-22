import * as functions from 'firebase-functions';
import express = require("express");
import bodyParser = require("body-parser");
import csvtojson = require('csvtojson');
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

app.post('/report', (req, res)=>{
    let csvData;
    return csvtojson().fromString(csvData).then(json => {return res.status(201).json({csv:csvData, json:json})})
})

exports.chartreportapi = functions.https.onRequest(app)
