'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Listing Schema
 */
var ListingSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Listing title',
    trim: true
  },
  desc: {
    type: String,
    default: '',
    required: 'Please fill Listing desc',
    trim: true
  },
  startCost: {
    type: Number,
    default: '',
    required: 'Please fill min price',
    trim: true
  },
  closeDate: {
    type: Date,
    default: '',
    required: 'Please fill date',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Listing', ListingSchema);
