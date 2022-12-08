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
        topic: results.topic
      })
    }
  )
};

// Handle card create on POST.
exports.card_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: card create POST");
};

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