const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StatusSchema = new Schema({
  card: { type: Schema.Types.ObjectId, ref: 'Title', required: true }, // reference to the associated book
  status: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advance', 'Master'],
    default: 'Beginner',
  },
});

// Virtual for bookinstance's URL
StatusSchema.virtual('url').get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/status/${this._id}`;
});

// Export model
module.exports = mongoose.model('Status', StatusSchema);
