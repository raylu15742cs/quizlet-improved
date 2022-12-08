const Card = require("../models/card");
const Topic = require("../models/topic");

const async = require("async")
const { body, validationResult } = require('express-validator');


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
      topic(callback) {
        Topic.find(callback)
      },
    },
    (err , results) => {
      if(err) {
        return next(err);
      }
      res.render("card_form", {
        title : "Create Card",
        topics: results.topic
      })
    }
  )
};

// Handle card create on POST.
exports.card_create_post = [
  // Convert Topic to an array
  (req, res, next) => {
    if (!Array.isArray(req.body.topic)) {
      req.body.topic =
        typeof req.body.genre === 'undefinied ' ? [] : [req.body.genre];
    }
    next();
  },

  // Validate and sanitize fields
  body('Card', 'Card Name must not be empty').trim().isLength({ min: 1 }).escape(),
  body('Definition', 'Definition must not be empty').trim().isLength({ min: 1 }).escape(),
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

      // Get all authors and genres for form.
      async.parallel(
        {
          topic(callback) {
            Topic.find(callback)
          },  
        },
        (err, results) => {
          if (err) {
            return next(err);
          }
          // Mark Topic selected
          for (const topic of results.topic) {
            if (card.topic.includes(topic._id)){
              topic.checked = "true"
            }
          }
          res.render("card_form", {
            title: "Create Card",
            topic: results.topic,
            card,
            errors: errors.array()
          })
        });
        return
      }
      // Data from form is valid. Save card.
    card.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful: redirect to new card record.
      res.redirect(card.url);
    });
  },
];
// Display card delete form on GET.
exports.card_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: card delete GET");
};

// Handle card delete on POST.
exports.card_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: card delete POST");
};

// Display card update form on GET.
exports.card_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: card update GET");
};

// Handle card update on POST.
exports.card_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: card update POST");
};