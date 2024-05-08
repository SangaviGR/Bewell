const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    apartmentNumber: {
        type: String,
        required: true
    },
    streetNumberAndName: {
        type: String,
        required: true
    },
    city: {  // Updated field name from cityOrTown
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    }
});

// Create a compound unique index on the address fields
addressSchema.index(
    { apartmentNumber: 1, streetNumberAndName: 1, city: 1, postalCode: 1 }, 
    { unique: true }
);

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;