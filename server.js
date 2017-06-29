'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const app = express();
app.use(bodyParser.json());

//connecting to database
mongoose.connect('mongodb://localhost:27017/pharmacy', err => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
});

//loading homepage
app.use(express.static(__dirname + "/public"));

app.listen(3000, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('app listening on port 3000');
});






