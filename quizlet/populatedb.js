#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true'
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var Topic = require("./models/topic")
var Card = require("./models/card")

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var topics = [];
var cards = [];


function topicCreate(name, cb) {
  var topic = new Topic({ name: name });

  topic.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Genre: ' + topic);
    topics.push(topic);
    cb(null, topic);
  });
}

function cardCreate(card, definition, topic, cb) {
  carddetail = {
    card: card,
    definition: definition,
    topic: topic,
  };

  var card = new Card(carddetail);
  card.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Card: ' + card);
    cards.push(card);
    cb(null, card);
  });
}

function createTopic(cb) {
  async.series(
    [
      function(callback) {
        topicCreate("Nodejs" , callback);
      },
      function(callback) {
        topicCreate("TypeScript" , callback);
      },
      function(callback) {
        topicCreate("JavaScript", callback)
      }
    ],
    //optional callback
    cb
  )
}


function createCards(cb) {
  async.parallel([
    function (callback) {
      cardCreate('Node.js1', 'first def', [topics[0]], callback);
    },
    function (callback) {
      cardCreate('Node.js2', 'second def', [topics[0]], callback);
    },
    function (callback) {
      cardCreate('Node.js3', 'third def', [topics[0]], callback);
    },
    function (callback) {
      cardCreate('TypeScript1', 'fourth def', [topics[1]], callback);
    },
    function (callback) {
      cardCreate('TypeScript2', 'fifth def', [topics[1]], callback);
    },
    function (callback) {
      cardCreate('TypeScript3', 'sixth def', [topics[1]], callback);
    },
    function (callback) {
      cardCreate('JavaScript1', 'seventh def', [topics[2]], callback);
    },
    function (callback) {
      cardCreate('JavaScript2', 'eigth def', [topics[2]], callback);
    },
    function (callback) {
      cardCreate('JavaScript3', 'ninth def', [topics[2]], callback);
    },
  ],
  //optional callback
  cb
  );
}



async.series(
  [createTopic, createCards],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('Success');
      console.log('Card: ' + Card);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
