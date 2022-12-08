const Card = require("../models/card");
const Topic = require("../models/topic");

const async = require("async")
const { body, validationResult } = require('express-validator');
const card = require("../models/card");


exports.index = (req, res) => {
  async.parallel(
    {
      card_count(callback){
        Card.countDocuments({}, callback)
      },
      topic_count(callback){
        Topic.countDocuments({}, callback)
      },
    },
    (err, result) => {
      res.render("index", {
        error: err,
        data: result,
      })
    }
  )
};

// Display list of all cards.
exports.card_list = (req, res, next) => {
    Card.find({}, "card definition status")
      .sort({card:1})
      .exec(function(err, list_cards) {
        if(err) {
          return next(err)
        }
        res.render("card_list", {title: "Card List", card_list: list_cards})
      })
}

// Display detail page for a specific card.
exports.card_detail = (req , res, next) => {
  async.parallel(
    {
      card(callback){
        Card.findById(req.params.id)
        .populate("topic")
        .populate("definition")
        .populate("status")
        .exec(callback)
      },
    },
    (err, results) => {
      if(err) {
        return next(err);
      }
      if(results.card == null) {
        // No card
        const err = new Error('Card not found');
        err.status = 404;
        return next(err);
      }
      //Success
      res.render("card_detail", {
        title: results.card.card,
        card: results.card
      })
    }
  )
}

// Display card create form on GET.
exports.card_create_get = (req, res, next) => {
  async.parallel(
    {
      topics(callback) {
        Topic.find(callback)
      },
    },
    (err , results) => {
      if(err) {
        return next(err);
      }
      res.render("card_form", {
        title : "Create Card",
        topics: results.topics
      })
    }
  )
};

// Handle card create on POST.
exports.card_create_post = [
  // Convert Topic to an array
  (req, res, next) => {
    if (!Array.isArray(req.body.topic)) {
      console.log(req.body.topic)
      req.body.topic =
        typeof req.body.genre==='undefined' ? [] : [req.body.genre];
    }
    next();
  },

  // Validate and sanitize fields
  body('card', 'Card Name must not be empty').trim().isLength({ min: 1 }).escape(),
  body('definition', 'Definition must not be empty').trim().isLength({ min: 1 }).escape(),
  body("status").escape(),
  body("topic.*").escape(),

  // Process reqyest after validaton and sanitization
  (req, res, next) => {
    // Validation errors
    const errors = validationResult(req);

    const card = new Card({
      card: req.body.card,
      definition: req.body.definition,
      status: req.body.status,
      topic: req.body.topic
    })
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all topics for form.
      async.parallel(
        {
          topics(callback) {
            Topic.find(callback)
          },  
        },
        (err, results) => {
          if (err) {
            return next(err);
          }
          // Mark Topic selected
          for (const topic of results.topics) {
            if (card.topic.includes(topic._id)){
              topic.checked = "true"
            }
          }
          res.render("card_form", {
            title: "Create Card",
            topics: results.topics,
            card,
            errors: errors.array()
          })
        });
        return
      }
      // Data from form is valid. Save card.
    card.save((err) => {
      console.log("made it here")
      if (err) {
        return next(err);
      }
      // Successful: redirect to new card record.
      res.redirect(card.url);
    });
  },
];
// Display card delete form on GET.
exports.card_delete_get = (req, res, next) => {
  async.parallel(
    {
      card(callback){
        Card.findById(req.params.id).exec(callback)
      }
    },
    (err, results) => {
      if(err) {
        return next(err)
      }
      if(results.card == null) {
        // No Card
        res.redirect("/catalog/cards")
      }
      //Successful , render delete form
      res.render("card_delete", {
        title: "Delete Card",
        card: results.card
      })
    }
  )
};

// Handle card delete on POST.
exports.card_delete_post = (req, res, next) => {
  async.parallel(
    {
      card(callback){
        Card.findById(req.params.id).exec(callback)
      }
    },
    (err, results) => {
      if(err) {
        return next(err)
      }
      Card.findByIdAndRemove(req.body.cardid , (err) => {
        if(err) {
          return next(err)
        }
        //Successful return to card list 
        res.redirect("/catalog/cards")
      })
    }
  )
};

// Display card update form on GET.
exports.card_update_get = (req, res, next) => {
  // Get card and topic for form
  async.parallel(
    {
      card(callback) {
        Card.findById(req.params.id)
          .populate("topic")
          .exec(callback);
      },
      topics(callback){
        Topic.find(callback)
      }
    },
    (err, results) => {
      if (err) {
        return next(err)
      }
      if(results.card == null) {
        //no result
        const err = new Error("Card not found")
        err.status = 404
        return next(err)
      }
      // Success
      // Mark Selected Topics
      for( const topic of results.topics) {
        for (const cardTopic of results.card.topic) {
          if(topic._id.toString() === cardTopic._id.toString()) {
            topic.checked = "true";
          }
        }
      }
      res.render("card_form", {
        title: "Update Card",
        card: results.card,
        topics: results.topics
      })
    }
  )
};

// Handle card update on POST.
exports.card_update_post = [
  // Convert topic to an array
  (req, res, next) => {
    if(!Array.isArray(req.body.topic)) {
      req.body.topic = typeof req.body.topic === "undefined" ? [] : [req.body.topic];
    }
    next()
  },

  // Validate and sanitize fields
  body('card', 'Card Name must not be empty').trim().isLength({ min: 1 }).escape(),
  body('definition', 'Definition must not be empty').trim().isLength({ min: 1 }).escape(),
  body("status").escape(),
  body("topic.*").escape(),

  // Process request after validation and sanitization
  (req, res , next) => {
    // Process validation request
    const errors = validationResult(req);

    const card = new Card({
      card: req.body.card,
      definition: req.body.definition,
      status: req.body.status,
      topic: req.body.topic,
      _id: req.params.id // Required or else new id will be assigned
    });
    
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all topics for form.
      async.parallel(
        {
          topics(callback) {
            Topic.find(callback);
          },
        },
        (err, results) => {
          if (err) {
            return next(err);
          }
          // Mark Topic selected
          for (const topic of results.topics) {
            if (card.topic.includes(topic._id)) {
              topic.checked = 'true';
            }
          }
          res.render('card_form', {
            title: 'Create Card',
            topics: results.topics,
            card,
            errors: errors.array(),
          });
        }
      );
      return;
    }

    // Data is valid, time to update
    Card.findByIdAndUpdate(req.params.id, card, {} , (err, thecard) => {
      if(err) {
        return next(err)
      }
      // Successful: redirect to card detail page
      res.redirect(thecard.url)
    })
  }

]