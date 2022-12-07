const Card = require("../models/card");

exports.index = (req, res) => {
  res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all cards.
exports.card_list = (req, res) => {
    res.send("NOT IMPLEMENTED: card List");
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