const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clickSchema = new Schema({
  continent: String,
  country: String,
  ip_address: String,
  latitude: Number,
  longitude: Number,
  currentCounter: Number
}, { timestamps: true });

const ModelClass = mongoose.model('click', clickSchema);
module.exports = ModelClass;
