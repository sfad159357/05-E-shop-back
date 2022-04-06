const Joi = require('joi');
const mongoose = require('mongoose');
const moment = require('moment');

const rentalSchema = new mongoose.Schema({
  customer: { 
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
      },
      isGold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
      }      
    }),  
    required: true
  },
  product: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true, 
        minlength: 3,
        maxlength: 255
      },
      onSale: { 
        type: Boolean, 
        required: true,

      }   
    }),
    required: true
  },
  dateOut: { 
    type: Date, 
    required: true,
    default: Date.now
  },
  dateReturned: { 
    type: Date
  },
  rentalFee: { 
    type: Number, 
    min: 0
  }
});

rentalSchema.statics.lookup = function(customerId, productId) {
  return this.findOne({
    'customer._id': customerId,
    'product._id': productId,
  });
}

rentalSchema.methods.return = function() {
  this.dateReturned = new Date();

  const rentalDays = moment().diff(this.dateOut, 'days');
  this.rentalFee = rentalDays * this.product.onSale;
}

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    productId: Joi.objectId().required()
  };

  return Joi.validate(rental, schema);
}

exports.Rental = Rental; 
exports.validate = validateRental;