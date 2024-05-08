const mongoose = require('mongoose');
const Address = require('./addressSchema');
const Signature = require('./signatureSchema');
const Patient = require('./patientSchema');
async function populateData(data) {
    try {
        console.log(data)
      // Create address objects
      const mailingAddress = new Address({
        apartmentNumber: data["apartmentMailing"],
        streetNumberAndName: data["streetMailing"],
        city: data["cityMailing"],
        postalCode: data["postalCodeMailing"]
      });
      const smailingAddress = await mailingAddress.save();
      console.log("mailingAddress saved:", smailingAddress);
  
      const residentialAddress = new Address({
        apartmentNumber: data["apartmentResidence"],
        streetNumberAndName: data["streetResidence"],
        city: data["cityResidence"],
        postalCode: data["postalCodeResidence"]
      });
  
      // Create signature object
      const signature = new Signature({
        onBehalfOf: data["isMyself"]
          ? ["myself"]
          : ["children", "dependent"],
        name: data["lastNameS"] + data["firstNameS"],
        signaturePdf: data["signature"],
        date: data["date"],
        homeTelephoneNo: data["homeTelNumber"],
        workTelephoneNo: data["workTelNumber"]
      });
  
      // Create patient object
      const patient = new Patient({
        lastName: data["lastName"],
        firstName: data["firstName"],
        secondName: data["secondName"],
        healthNumber: data["healthNumber"],
        versionCode: data["versionCode"],
        mailingAddress: mailingAddress,
        residentialAddress: residentialAddress,
        email: data["email"],
        dob: new Date(data["dateOfBirth"].replace(/-/g, "")),
        sex: data["sex"] === "female" ? "F" : "M",
        noticesSent: data["isMyself"] ? notices : undefined,
        relationship: relationship,
        signature: signature
      });
  
      // Save the patient object to the database
      const savedPatient = await patient.save();
      console.log("Patient saved:", savedPatient);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }

  module.exports = {
    populateData,
  };