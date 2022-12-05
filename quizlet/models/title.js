const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TitleSchema = new Schema({
  title: { type: String, required: true },
  definition: { type: Schema.Types.ObjectId, ref: 'Definition', required: true },
  topic: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
});

// Virtual for book's URL
TitleSchema.virtual('url').get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/title/${this._id}`;
});

// Export model
module.exports = mongoose.model('Title', TitleSchema);
