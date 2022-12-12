const Topic = require('../models/topic');
const Card = require("../models/card");

const async = require("async")
const { body, validationResult } = require('express-validator');
const { getMaxListeners } = require('../models/card');


// Display list of all topics.
exports.topic_list = (req, res, next) => {
  Topic.find()
    .exec(function(err, list_topics){
      if(err) {
        return next(err)
      }
      //successful, so render
      res.render("topic_list", {
        title: "All Topics",
        topic_list: list_topics
      })
    })
};

// Display detail page for a specific topic.
exports.topic_detail = (req, res, next) => {
  async.parallel(
    {
      topic(callback) {
        Topic.findById(req.params.id).exec(callback);
      },
      topic_cards(callback){
        Card.find({topic:req.params.id}).exec(callback);
      }
    },
    (err, results) => {
      if(err) {
        return next(err);
      }
      if(results.topic == null) {
        //No Result.
        const err = new Error("Topic not found");
        err.status = 404;
        return next(err)
      }
      //Success
      res.render("topic_detail", {
        title: "Topic Detail",
        topic: results.topic,
        topic_cards: results.topic_cards,
      })
    }
  )
};

// Display topic create form on GET.
exports.topic_create_get = (req, res , next) => {
  res.render("topic_form", {title: "New Topic"})
}

// Handle topic create on POST.
exports.topic_create_post = [
  //Validate and Sanitize the field
  body('name', 'No Topic Name').trim().isLength({ min: 1 }).escape(),
  body('password', 'incorrect password').trim().contains('password'),

  // Process after validation and sanitization
  (req, res, next) => {
    // Validation errors from a request
    const errors = validationResult(req);

    // Create a topic object with trimmed data
    const topic = new Topic({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There is errors, so re render form with sanitized values and error messages
      res.render('topic_form', {
        title: 'Create Topics',
        topic,
        errors: errors.array(),
      });
      return;
    } else {
      // Data form is valid (No Errors)
      // Need to check if topic already exist
      Topic.findOne({ name: req.body.name }).exec((err, found_topic) => {
        if (err) {
          return next(err);
        }
        if (found_topic) {
          // Topic Exist, redirect to Topic Detail List
          res.redirect(topic.url);
        } else {
          topic.save((err) => {
            if (err) {
              return next(err);
            }
            //Topic Saved
            res.redirect(topic.url);
          });
        }
      });
    }
  },
];

// Display topic delete form on GET.
exports.topic_delete_get = (req, res, next) => {
  async.parallel(
    {
      topic(callback) {
        Topic.findById(req.params.id).exec(callback);
      },
      topic_cards(callback) {
        Card.find({topic: req.params.id}).exec(callback)
      },
    },
    (err, results) => {
      if(err) {
        return next(err)
      }
      if (results.topic == null) {
        // No Topic
        res.redirect("./catalog/topics");
      }
      //Successful, so render delete form
      res.render("topic_delete", {
        title: "Delete Topic",
        topic: results.topic,
        topic_cards: results.topic_cards,
      })
    }
  )
};

// Handle topic delete on POST.
exports.topic_delete_post = (req, res, next) => {
  async.parallel(
    {
      topic(callback) {
        Topic.findById(req.params.id).exec(callback);
      },
      topic_cards(callback) {
        Card.find({topic: req.params.id}).exec(callback)
      }
    },
    (err, results) => {
      if (err ) {
        return next(err)
      }
      //Success
      if(results.topic_cards.length > 0) {
        // Topic still has cards / render back as get
        res.render("topic_delete", {
          title: "Delete Topic",
          topic: results.topic,
          topic_cards: results.topic_cards
        });
        return;
      }
      //Topic has no cards / Delete topic and return to list of topics
      Topic.findByIdAndRemove(req.body.topicid , (err) => {
        if(err) {
          return next(err);
        }
        // Success return to topic list
        res.redirect("/catalog/topics")
      })
    }
  )
};



// Display topic update form on GET.
exports.topic_update_get = (req, res, next) => {
  // get Topic for form
  async.parallel(
    {
      topic(callback) {
        Topic.findById(req.params.id).exec(callback)
      }
    },
    (err, results) => {
      if(err) {
        return next(err)
      }
      if(results.topic == null) {
        // no topic
        const err = new Error ("Topic not found")
        err.status = 404
        return next(err)
      }
      // Success
      res.render("topic_form" , {
        title: "Update Topic get",
        topic: results.topic
      })
    }
  )
};

// Handle topic update on POST.
exports.topic_update_post = [
  //Validate and Sanitize Topic Field
  body("name", "Topic Name Required").trim().isLength({min:1}).escape(),
  body('password', 'incorrect password').trim().contains('password'),
  (req, res, next) => {
    const errors = validationResult(req);

    const topic = new Topic({name: req.body.name, _id: req.params.id});

    if(!errors.isEmpty()) {
      //Errors so re render with sanitized value and error message
      res.render("topic_form", {
        title: "Create Topic",
        topic,
        errors: errors.array(),
      });
      return;
    } else {
      // data is value
      // check if new is exisiting and should redirect there
      Topic.findOne({name: req.body.name}).exec((err, found_topic) => {
        if(err) {
          return next(err);
        }

        if(found_topic) {
          // Topic exist, redirect to it
          res.redirect(found_topic.url);
        } else {
          // Update it
          Topic.findByIdAndUpdate(req.params.id , topic , {}, (err, theTopic) => {
            if(err) {
              return next(err)
            }
            // Topic Update Saved, Redirect to that page
            res.redirect(theTopic.url)
          })
        }
      })
    }
  }
]