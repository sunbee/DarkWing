// JavaScript File
var Alert = require("./alert.js");

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/test');

var myAlert = new Alert({
    Note: "I went to meet Roger Pena at Cafe Santa Maria on 9th Main",
    Email: 'sanjay.bhatikar@gmail.com',
    Trigger: new Date(2016, 12, 01),
    Active: true,
})

myAlert.save(function(err, doc) {
    if (err) throw err;
    console.log("Saved: " + doc);
});