import * as functions from "firebase-functions";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as csvtojson from "csvtojson";

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

app.get("/", (req, res) => {
  res.status(200).json({ chartreportapi: "works" });
});

app.post("/reportfile", (req, res) => {
  let csvDataBuffer = JSON.stringify(req.body);
  let csvData = JSON.parse(csvDataBuffer).data;
  let csvDataString = csvData.toString("utf8");
  console.log(req.body.data);
  return csvtojson()
    .fromString(csvDataString)
    .then(json => {
      return res.status(201).json({ csv: csvDataString, json: json });
    });
  
});

exports.chartreportapi = functions.https.onRequest(app);
