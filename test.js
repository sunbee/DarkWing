// JavaScript File
var mongoose = require("mongoose");
var assert = require("assert");


// Before: Drop the table 'alerts' in 'test' database

// CRUD operations (Test) using 'Alert' model
describe("CRUD Operations", function() {

    mongoose.connect("mongodb://localhost:27017");
    var Alert = require("./alert.js");
    var myAlert;
    
    before(function(done) {
        myAlert = new Alert({
            Note: "I went to meet Roger Pena at Cafe Pearl on 9th Main",
            Email: 'sanjay.bhatikar@gmail.com',
            Trigger: new Date(2016, 12, 01),
            Active: true,
        }); // End myAlert
        done();
    }); // End before()


    after(function(done) {
        Alert.remove({}, function(error) {
            assert.ifError(error);
            done();
        }); // End remove()
    }); // End after()
    

    it("Inserts a record", function(done) {
        myAlert.save(function(err, doc) {
            assert.ifError(err);
            Alert.findOne({}, function(err, res) {
                assert.ifError(err);
                console.log("Found: " + res);
                assert.equal(res.Email, "sanjay.bhatikar@gmail.com");
                done();
            }) // End findOne()
        }); // End save()
    }); // End it()
    
    it("Finds and updates a record", function(done) {
        myAlert.save(function(err, doc) {
            assert.ifError(err);
            Alert.findOneAndUpdate({Email: myAlert.Email}, {$set: {Active: false}}, function(err, doc) {
                assert.ifError(err);
                Alert.findOne({}, function(err, doc) {
                    assert.ifError(err);
                    console.log("Found updated: ", doc);
                    assert.equal(doc.Email, "sanjay.bhatikar@gmail.com");
                    assert.equal(doc.Active, false);
                    done();   
                }); // End findOne()
            }); // End findOneAndUpdate()
        }); // End save()
    }); // End it()
}); // End describe()

// After: