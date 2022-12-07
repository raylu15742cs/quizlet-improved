var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TopicSchema = new Schema({
  name: { type: String, required: true, minLength: 1, maxLength: 100 },
});

// Virtual for this genre instance URL.
TopicSchema.virtual('url').get(function () {
  return '/catalog/topic/' + this._id;
});

// Export model.
module.exports = mongoose.model('Topic', TopicSchema);
