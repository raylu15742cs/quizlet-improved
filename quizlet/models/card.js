const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CardSchema = new Schema({
  card: { type: String, required: true },
  information: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advance', 'Master'],
    default: 'Beginner',
  },
  topic: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
});

// Virtual for book's URL
CardSchema.virtual('url').get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/card/${this._id}`;
});

// Export model
module.exports = mongoose.model('Card', CardSchema);
