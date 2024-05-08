const mongoose = require('mongoose');

const signatureSchema = new mongoose.Schema({
    onBehalfOf: {
        type: [{
            type: String
        }]
    },
    name: {
        type: String,
        required: true
    },
    signaturePdf: {
        type: Buffer,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    homeTelephoneNo: {
        type: String,
        required: true
    },
    workTelephoneNo: {
        type: String,
        required: true
    }
});

const Signature = mongoose.model('Signature', signatureSchema);

module.exports = Signature;
