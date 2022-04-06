const Joi = require('joi');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  }
});

const Category = mongoose.model('category', categorySchema);

function validateCategory(category) {
  const schema = {
    name: Joi.string().min(2).max(50).required()
  };

  return Joi.validate(category, schema);
}

exports.categorySchema = categorySchema;
exports.Category = Category; 
exports.validate = validateCategory;