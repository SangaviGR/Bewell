const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  signature: { type: String, unique: true, required: true }, // Assuming the signature is stored as a URL or base64 string
});

module.exports = mongoose.model('Doctor', doctorSchema);
