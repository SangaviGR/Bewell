const mongoose = require('mongoose');
const Address = require('./addressSchema');
const Signature = require('./signatureSchema');

const patientSchema = new mongoose.Schema({
    lastName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    },
    healthNumber: {
        type: String,
        required: true,
        unique: true
    },
    versionCode: {
        type: String,
        required: true
    },
    mailingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',required: true
    },
    residentialAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',required: true
    },
    email: {
        type: String,
        required: function() {
            return this.relationship === 'self';
        }
    },
    dob: {
        type: String
        
    },
    sex: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    noticesSent: {
        type: String,
        enum: ['email', 'Regular Mail'],
        required: function() {
            return this.relationship === 'self';
        }
    },
    relationship: {
        type: String,
        enum: ['self', 'children', 'depenent'],
        required: true
    },
    signature: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Signature',
        required: true
    },
    parentLegalGuardianAttorney: {
        type: String,
        required: function() {
            return this.relationship === 'children' || this.relationship === 'dependent';
        },
        enum: ['Parent' , 'legal guardian','attorney for personal care']
    }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
