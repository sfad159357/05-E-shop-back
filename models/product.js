const Joi = require('joi');
const mongoose = require('mongoose');
const {categorySchema} = require('./category');

const Product = mongoose.model('Products', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
    minlength: 2,
    maxlength: 255
  },
  category: { 
    type: categorySchema,  
    required: true
  },
  onSale: {
    type: Number,
    required: true
  },
  price: { 
    type: Number, 
    required: true
  },
  numberInStock: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  },
  sales: { 
    type: Number, 
    required: true,
    min: 0
  },
  src: { 
    type: String, 
    required: true,
    min: 0,
    max: 255
  },
  // path: { 
  //   type: String, 
  //   required: true,
  //   min: 0,
  //   max: 15
  // },
}));

function validateProduct(product) {
  const schema = {
    title: Joi.string().min(2).max(50).required(),
    categoryId: Joi.objectId().required(),
    onSale:Joi.number().required(),
    price: Joi.number().min(0).required(),
    numberInStock: Joi.number().min(0).required(),
    sales: Joi.number().min(0).required(),
    src:Joi.string().min(2).required(),
    // path: Joi.string().min(2).required(),

  };

  return Joi.validate(product, schema);
}

exports.Product = Product; 
exports.validate = validateProduct;