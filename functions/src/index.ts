import * as functions from 'firebase-functions';
import express = require("express");
import bodyParser = require("body-parser");
import csvtojson = require('csvtojson');
// import multer = require('multer');
import file_upload = require('express-fileupload');

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
// const upload = multer();

const app = express();
app.use(file_upload())
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

// app.post('/report', upload.single(), (req, res)=>{
//     let csvData = req.file.filename;
//     console.log(csvData);
//     // return csvtojson().fromString(csvData).then(json => {return res.status(201).json({csv:csvData, json:json})})
// })

app.post('/reportfile', (req, res)=>{
    // let csvData = req.files.csvfile
    // let csv = (csvData)=>csvData.data.toString('utf8')
    // console.log(csvData);
    // return csvtojson().fromString(csvData).then(json => {return res.status(201).json({csv:csvData, json:json})})
})

exports.chartreportapi = functions.https.onRequest(app)
