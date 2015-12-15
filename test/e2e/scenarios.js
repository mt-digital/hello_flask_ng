'use strict';

var mongo = require('mongodb');

var mongocl = mongo.MongoClient;

var MD_COLLECTION = 'greeting';
var MD_TEST_DB = 'greetings_test';
var MONGO_HOST = 'mongodb://localhost:27017/';


mongocl.connect('mongodb://localhost:27017/' + MD_TEST_DB, function (err, db) {

    console.log('Connected to server');

    var coll = db.collection(MD_COLLECTION);

    var all = coll.find({}).toArray(function(err, docs) {
        console.log("\n**** Found these! ****\n");
        console.dir(docs);
    });
});


describe('Greeting requests', function () {
    beforeEach(function() {
        browser.get('frontend/index.html');

        mongocl.connect(MONGO_HOST + MD_TEST_DB, function(err, db) {
            var coll = db.collection(MD_COLLECTION);
            coll.drop();
        });
    });


    it('should contain the right name and one of the eight languages ' +
        'after submitting to server', function() {

        // var nameQuery = element(by.id('name'));
        var nameQuery = element(by.model('stuff.name'));
        nameQuery.sendKeys('Matthew');

        expect(nameQuery.getAttribute('value')).toEqual('Matthew');

        element(by.css('#handle')).click();

        // // can't know exactly what the greeting will be
        // console.log(element(by.model('greeting')).getText());
        expect(element(by.id('greeting')).getText()).toContain('Matthew');
        expect(element(by.model('stuff.greeting')).getText()).toContain('Matthew');

        var languages = ['English', 'Spanish', 'Russian', 'Japanese',
            'Turkish', 'Arabic', 'Hebrew', 'French'];

        expect(languages).toContain(element(by.model('stuff.language')).getText());
    });
});