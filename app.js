const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const multer = require('multer');

const fs = require("fs");


require('dotenv').config();


// const dns = require('dns');
//
// const mongoose = require("mongoose");
//
// // Import Model
// const { UserModel, ExersiceModel } = require('./db_Model/project_models.js');
//
//
// ////////////////////////////////////////////
// // MongoDB
// const settingsConnection = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   dbName: process.env.DBNAME
// }
//
// mongoose.connect(
//     process.env.URI_MONGO,
//     settingsConnection
//   )
//   .then((response) => {
//     // console.log(response.connections[0].name)
//     console.log("Connected!");
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// ////////////////////////////////////////////

app.use(bodyParser.urlencoded({extended: false}));

const upload = multer({dest: './public/upload/'});


app.get('/', (req, res) => {
  let absPath = __dirname + '/views/index.html';
  res.sendFile(absPath);
});


app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const fileUpload = req.file;


  console.log(
    fileUpload.originalname,
    fileUpload.mimetype,
    fileUpload.size,

  );

  const path = __dirname + `/${fileUpload.path}`;
  fs.unlink(path, (failremove) => {
    if (failremove) {
      console.log(failremove);
    }
    console.log('File Removed');
  });

  res.json({
    name: fileUpload.originalname,
    type: fileUpload.mimetype,
    size: fileUpload.size,
  });
});



app.use('/assets', express.static(__dirname + '/public'));

module.exports = app;
