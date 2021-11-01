const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuoteSchema = new Schema({
 quote: String,
 author: String
})

const UserSchema = new Schema({
 name: {
  type: String,
  required: true
 },
 email: {
  type: String,
  required: true
 },
 password: {
  type: String,
  required: true
 },
 quotes: [QuoteSchema]
})

const User = mongoose.model('User', UserSchema);
const Quotes = mongoose.model('Quotes', QuoteSchema);

module.exports = User, Quotes;