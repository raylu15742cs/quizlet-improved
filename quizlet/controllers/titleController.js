const Title = require("../models/title");

exports.index = (req, res) => {
  res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all titles.
exports.title_list = (req, res) => {
    res.send("NOT IMPLEMENTED: title List");
}

// Display detail page for a specific title.
exports.title_detail = (req , res) => {
    res.send(`NOT IMPLEMENTED: title Details: ${req.params.id}`)
}

// Display title create form on GET.
exports.title_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: title create GET");
};

// Handle title create on POST.
exports.title_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: title create POST");
};

// Display title delete form on GET.
exports.title_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: title delete GET");
};

// Handle title delete on POST.
exports.title_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: title delete POST");
};

// Display title update form on GET.
exports.title_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: title update GET");
};

// Handle title update on POST.
exports.title_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: title update POST");
};