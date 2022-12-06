const Definition = require("../models/definition");

// Display list of all Definitions.
exports.definition_list = (req, res) => {
    res.send("NOT IMPLEMENTED: Definition List");
}

// Display detail page for a specific definition.
exports.definition_detail = (req , res) => {
    res.send(`NOT IMPLEMENTED: Definition Details: ${req.params.id}`)
}

// Display definition create form on GET.
exports.definition_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: definition create GET");
};

// Handle definition create on POST.
exports.definition_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: definition create POST");
};

// Display definition delete form on GET.
exports.definition_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: definition delete GET");
};

// Handle definition delete on POST.
exports.definition_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: definition delete POST");
};

// Display definition update form on GET.
exports.definition_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: definition update GET");
};

// Handle definition update on POST.
exports.definition_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: definition update POST");
};