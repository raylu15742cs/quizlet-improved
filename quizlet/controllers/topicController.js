const Topic = require('../models/topic');
const Card = require("../models/card");

const async = require("async")

// Display list of all topics.
exports.topic_list = (req, res, next) => {
  Topic.find()
    .exec(function(err, list_topics){
      if(err) {
        return next(err)
      }
      //successful, so render
      res.render("topic_list", {
        title: "Topic List",
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
        Card.find({topic: req.param.id}).exec(callback);
      }
    },
    (err, result) => {
      if(err) {
        return next(err);
      }
      if(results.genre == null) {
        //No Result.
        const err = new Error("Topic not found");
        err.status = 404;
        return next(err)
      }
      //Success
      res.render("topic_detail", {
        title: "Topic Detail",
        topic: results.topic,
        topic_cards: result.topic_cards,
      })
    }
  )
};

// Display topic create form on GET.
exports.topic_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: topic create GET');
};

// Handle topic create on POST.
exports.topic_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: topic create POST');
};

// Display topic delete form on GET.
exports.topic_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: topic delete GET');
};

// Handle topic delete on POST.
exports.topic_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: topic delete POST');
};

// Display topic update form on GET.
exports.topic_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: topic update GET');
};

// Handle topic update on POST.
exports.topic_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: topic update POST');
};
