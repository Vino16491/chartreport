import * as functions from 'firebase-functions';
import * as express from "express";
import * as bodyParser from "body-parser";
import * as csvtojson from 'csvtojson';
import * as file_upload from 'express-fileupload';
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
    let csvDataBuffer = JSON.stringify(req.body);
    let csvData = JSON.parse(csvDataBuffer).data;
    let csvDataString = csvData.toString('utf8')
    // let csv = (csvData)=>csvData.data.toString('utf8')
    console.log(csvData.toString('utf8'));
    return csvtojson().fromString(csvDataString).then(json => {return res.status(201).json({csv:csvDataString, json:json})})
    // return csvtojson().on('data', (csvDataString)=>{const jsonStr = csvDataString.toString('utf8')})?
})

exports.chartreportapi = functions.https.onRequest(app)
