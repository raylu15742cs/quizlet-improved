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
var Collection = require("./models/collection")
var Status = require("./models/status")
var Title = require("./models/title")

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var definitions = [];
var collections = [];
var statuses = [];
var titles = [];

function definitionCreate(definition, cb) {
  definitiondetail = { definition};

  var definition = new Definition(definitiondetail);

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

function collectionCreate(name, cb) {
  var collection = new Collection({ name: name });

  collection.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Genre: ' + collection);
    collections.push(collection);
    cb(null, collection);
  });
}

function titleCreate(title, definition, collection, cb) {
  titledetail = {
    title: title,
    definition: definition,
    collection: collection,
  };

  var title = new Title(titledetail);
  title.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Card: ' + title);
    titles.push(title);
    cb(null, title);
  });
}

function statuseCreate(title, status, cb) {
  statusdetail = {
    title: title,
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
    cb(null, title);
  });
}
function createCollection(cb) {
  async.series(
    [
      function(callback) {
        collectionCreate("Nodejs" , callback);
      },
      function(callback) {
        collectionCreate("TypeScript" , callback);
      },
      function(callback) {
        collectionCreate("JavaScript", callback)
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
  ],
  //optional callback
  cb
  );
}
function createTitles(cb) {
  async.parallel([
    function (callback) {
      titleCreate('Node.js1', definitions[0], [collections[0]], callback);
    },
    function (callback) {
      titleCreate('Node.js2', definitions[1], [collections[0]], callback);
    },
    function (callback) {
      titleCreate('Node.js3', definitions[2], [collections[0]], callback);
    },
    function (callback) {
      titleCreate('TypeScript1', definitions[3], [collections[1]], callback);
    },
    function (callback) {
      titleCreate('TypeScript2', definitions[4], [collections[1]], callback);
    },
    function (callback) {
      titleCreate('TypeScript3', definitions[5], [collections[1]], callback);
    },
    function (callback) {
      titleCreate('JavaScript1', definitions[6], [collections[2]], callback);
    },
    function (callback) {
      titleCreate('JavaScript2', definitions[7], [collections[2]], callback);
    },
    function (callback) {
      titleCreate('JavaScript3', definitions[8], [collections[2]], callback);
    },
  ],
  //optional callback
  cb
  );
}
function createStatuses(cb) {
  async.parallel([
    function (callback) {
      statuseCreate(titles[0], 'Beginner', callback);
    },
    function (callback) {
      statuseCreate(titles[1], 'Beginner', callback);
    },
    function (callback) {
      statuseCreate(titles[2], 'Beginner', callback);
    },
    function (callback) {
      statuseCreate(titles[3], 'Beginner', callback);
    },
    function (callback) {
      statuseCreate(titles[4], 'Beginner', callback);
    },
    function (callback) {
      statuseCreate(titles[5], 'Beginner', callback);
    },
    function (callback) {
      statuseCreate(titles[6], 'Beginner', callback);
    },
    function (callback) {
      statuseCreate(titles[7], 'Beginner', callback);
    },
    function (callback) {
      statuseCreate(titles[8], 'Beginner', callback);
    },
  ],
  //optional callback
  cb
  );
}

function createBookInstances(cb) {
  async.parallel(
    [
      function (callback) {
        bookInstanceCreate(
          books[0],
          'London Gollancz, 2014.',
          false,
          'Available',
          callback
        );
      },
      function (callback) {
        bookInstanceCreate(
          books[1],
          ' Gollancz, 2011.',
          false,
          'Loaned',
          callback
        );
      },
      function (callback) {
        bookInstanceCreate(
          books[2],
          ' Gollancz, 2015.',
          false,
          false,
          callback
        );
      },
      function (callback) {
        bookInstanceCreate(
          books[3],
          'New York Tom Doherty Associates, 2016.',
          false,
          'Available',
          callback
        );
      },
      function (callback) {
        bookInstanceCreate(
          books[3],
          'New York Tom Doherty Associates, 2016.',
          false,
          'Available',
          callback
        );
      },
      function (callback) {
        bookInstanceCreate(
          books[3],
          'New York Tom Doherty Associates, 2016.',
          false,
          'Available',
          callback
        );
      },
      function (callback) {
        bookInstanceCreate(
          books[4],
          'New York, NY Tom Doherty Associates, LLC, 2015.',
          false,
          'Available',
          callback
        );
      },
      function (callback) {
        bookInstanceCreate(
          books[4],
          'New York, NY Tom Doherty Associates, LLC, 2015.',
          false,
          'Maintenance',
          callback
        );
      },
      function (callback) {
        bookInstanceCreate(
          books[4],
          'New York, NY Tom Doherty Associates, LLC, 2015.',
          false,
          'Loaned',
          callback
        );
      },
      function (callback) {
        bookInstanceCreate(books[0], 'Imprint XXX2', false, false, callback);
      },
      function (callback) {
        bookInstanceCreate(books[1], 'Imprint XXX3', false, false, callback);
      },
    ],
    // Optional callback
    cb
  );
}

async.series(
  [createGenreAuthors, createBooks, createBookInstances],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('BOOKInstances: ' + bookinstances);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
