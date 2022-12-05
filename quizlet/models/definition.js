const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DefinitionSchema = new Schema({
  definition: { type: String, required: true, minLength: 1 },
});


// Virtual for author's URL
DefinitionSchema.virtual('url').get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/definition/${this._id}`;
});

// Export model
module.exports = mongoose.model('Definition', DefinitionSchema);
