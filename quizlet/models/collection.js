var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CollectionSchema = new Schema({
  name: { type: String, required: true, minLength: 1, maxLength: 100 },
});

// Virtual for this genre instance URL.
CollectionSchema.virtual('url').get(function () {
  return '/catalog/genre/' + this._id;
});

// Export model.
module.exports = mongoose.model('Collection', CollectionSchema);
