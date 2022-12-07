const Card = require("../models/card");
const Topic = require("../models/topic");
const Status = require("../models/status")

const async = require("async")

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
        title: "Quizlet Improved",
        error: err,
        data: result,
      })
    }
  )
};

// Display list of all cards.
exports.card_list = (req, res, next) => {
    Card.find({}, "card status")
      .sort({card:1})
      .populate("status")
      .exec(function(err, list_cards) {
        if(err) {
          return next(err)
        }
        res.render("card_list", {title: "Card List", card_list: list_cards})
      })
}

// Display detail page for a specific card.
exports.card_detail = (req , res) => {
    res.send(`NOT IMPLEMENTED: card Details: ${req.params.id}`)
}

// Display card create form on GET.
exports.card_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: card create GET");
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