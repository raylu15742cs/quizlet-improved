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
var Definition  = require("./models/definition")
var Topic = require("./models/topic")
var Status = require("./models/status")
var Card = require("./models/card")

var mongoose = require('mongoose');
const status = require('./models/status');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var definitions = [];
var topics = [];
var statuses = [];
var cards = [];

function definitionCreate(definition, cb) {
  var definition = new Definition({definition: definition});

  definition.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Definition: ' + definition);
    definitions.push(definition);
    cb(null, definition);
  });
}

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

function statuseCreate(card, status, cb) {
  statusdetail = {
    card: card,
    status: status,
  };

  var status = new Status(statusdetail);
  status.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Status: ' + status);
      cb(err, null);
      return;
    }
    console.log('New Status: ' + status);
    statuses.push(status);
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

function createDefinition(cb) {
  async.series(
    [
      function (callback) {
        definitionCreate('first def', callback);
      },
      function (callback) {
        definitionCreate('second def', callback);
      },
      function (callback) {
        definitionCreate('third def', callback);
      },
      function (callback) {
        definitionCreate('fourth def', callback);
      },
      function (callback) {
        definitionCreate('fifth def', callback);
      },
      function (callback) {
        definitionCreate('sixth def', callback);
      },
      function (callback) {
        definitionCreate('seventh def', callback);
      },
      function (callback) {
        definitionCreate('eighth def', callback);
      },
      function (callback) {
        definitionCreate('ninth def', callback);
      },
    ],
    //optional callback
    cb
  );
}

function createCards(cb) {
  async.parallel([
    function (callback) {
      cardCreate('Node.js1', definitions[0], [topics[0]], callback);
    },
    function (callback) {
      cardCreate('Node.js2', definitions[1], [topics[0]], callback);
    },
    function (callback) {
      cardCreate('Node.js3', definitions[2], [topics[0]], callback);
    },
    function (callback) {
      cardCreate('TypeScript1', definitions[3], [topics[1]], callback);
    },
    function (callback) {
      cardCreate('TypeScript2', definitions[4], [topics[1]], callback);
    },
    function (callback) {
      cardCreate('TypeScript3', definitions[5], [topics[1]], callback);
    },
    function (callback) {
      cardCreate('JavaScript1', definitions[6], [topics[2]], callback);
    },
    function (callback) {
      cardCreate('JavaScript2', definitions[7], [topics[2]], callback);
    },
    function (callback) {
      cardCreate('JavaScript3', definitions[8], [topics[2]], callback);
    },
  ],
  //optional callback
  cb
  );
}
function createStatuses(cb) {
  async.parallel([
    function (callback) {
      statuseCreate(cards[0], 'Beginner', callback);
    },
    function (callback) {
      statuseCreate(cards[1], 'Beginner', callback);
    },
    function (callback) {
      statuseCreate(cards[2], 'Beginner', callback);
    },
    function (callback) {
      statuseCreate(cards[3], 'Beginner', callback);
    },
    function (callback) {
      statuseCreate(cards[4], 'Beginner', callback);
    },
    function (callback) {
      statuseCreate(cards[5], 'Beginner', callback);
    },
    function (callback) {
      statuseCreate(cards[6], 'Beginner', callback);
    },
    function (callback) {
      statuseCreate(cards[7], 'Beginner', callback);
    },
    function (callback) {
      statuseCreate(cards[8], 'Beginner', callback);
    },
  ],
  //optional callback
  cb
  );
}



async.series(
  [ createTopic, createDefinition, createCards, createStatuses],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log("Success")
      console.log('Status: ' + status);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
