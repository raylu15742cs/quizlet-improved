const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CardSchema = new Schema({
  card: { type: String, required: true },
  definition: { type: Schema.Types.ObjectId, ref: 'Definition', required: true },
  status: {type: Schema.Types.ObjectId, ref:"Status"},
  topic: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
});

// Virtual for book's URL
CardSchema.virtual('url').get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/card/${this._id}`;
});

// Export model
module.exports = mongoose.model('Card', CardSchema);
