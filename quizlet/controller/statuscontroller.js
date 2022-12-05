const Status = require('../models/status');

// Display list of all statuss.
exports.status_list = (req, res) => {
  res.send('NOT IMPLEMENTED: status List');
};

// Display detail page for a specific status.
exports.status_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: status Details: ${req.params.id}`);
};

// Display status create form on GET.
exports.status_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: status create GET');
};

// Handle status create on POST.
exports.status_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: status create POST');
};

// Display status delete form on GET.
exports.status_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: status delete GET');
};

// Handle status delete on POST.
exports.status_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: status delete POST');
};

// Display status update form on GET.
exports.status_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: status update GET');
};

// Handle status update on POST.
exports.status_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: status update POST');
};
