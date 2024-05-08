const {
  PDFDocument,
  PDFTextField,
  PDFRadioGroup,
  PDFCheckBox,PDFSignature
} = require("pdf-lib");
const { readFile, writeFile } = require("fs/promises");
const axios = require("axios");
const Address = require('../models/addressSchema');
const Signature = require('../models/signatureSchema');
const Patient = require('../models/patient');
const moment = require('moment'); // Import moment.js
async function createPdf(input, output, data) {
  try {
    // Create address objects
    const mailingAddress = new Address({
      apartmentNumber: data["apartmentMailing"] || "",
      streetNumberAndName: data["streetMailing"] || "",
      city: data["cityMailing"] || "",
      postalCode: data["postalCodeMailing"] || "",
    });

    const residentialAddress = new Address({
      apartmentNumber: data["apartmentResidence"] || "",
      streetNumberAndName: data["streetResidence"] || "",
      city: data["cityResidence"] || "",
      postalCode: data["postalCodeResidence"] || "",
    });

    // // Save the address objects to the database
    // await mailingAddress.save();
    // await residentialAddress.save();


    // Create address objects
    const mailingAddressA = new Address({
      apartmentNumber: data["childApartmentMailing"] || "",
      streetNumberAndName: data["childStreetMailing"] || "",
      city: data["childCityMailing"] || "",
      postalCode: data["childPostalCodeMailing"] || "",
    });

    const residentialAddressA = new Address({
      apartmentNumber: data["childApartmentResidence"] || "",
      streetNumberAndName: data["childStreetResidence"] || "",
      city: data["childCityResidence"] || "",
      postalCode: data["childPostalCodeResidence"] || "",
    });

    // // Save the address objects to the database
    // await mailingAddressA.save();
    // await residentialAddressA.save();

    // Create address objects
    const mailingAddressB = new Address({
      apartmentNumber: data["childApartmentMailingB"] || "",
      streetNumberAndName: data["childStreetMailingB"] || "",
      city: data["childCityMailingB"] || "",
      postalCode: data["childPostalCodeMailingB"] || "",
    });

    const residentialAddressB = new Address({
      apartmentNumber: data["childApartmentResidenceB"] || "",
      streetNumberAndName: data["childStreetResidenceB"] || "",
      city: data["childCityResidenceB"] || "",
      postalCode: data["childPostalCodeResidenceB"] || "",
    });

    // // Save the address objects to the database
    // await mailingAddressB.save();
    // await residentialAddressB.save();

    async function checkAndSaveAddress(mailingAddresss) {
      // Check if an address already exists in the database
      const existingAddress = await Address.findOne({
        apartmentNumber: mailingAddresss.apartmentNumber,
        streetNumberAndName: mailingAddresss.streetNumberAndName,
        city: mailingAddresss.city,
        postalCode: mailingAddresss.postalCode,
      });
    
      // Save the address if it doesn't already exist
      if (!existingAddress) {
        await mailingAddresss.save();
      }
    }
    
    // Call the function for each address
    await Promise.all([
      checkAndSaveAddress(mailingAddress),
      checkAndSaveAddress(residentialAddress),
      checkAndSaveAddress(mailingAddressA),
      checkAndSaveAddress(residentialAddressA),
      checkAndSaveAddress(mailingAddressB),
      checkAndSaveAddress(residentialAddressB),
    ]);
    // Determine onBehalfOf values
    let onBehalfOf = [];
    if (data["isMyself"]) {
      onBehalfOf.push("myself");
    }
    if (data["isChildren"]) {
      onBehalfOf.push("children");
    }
    if (data["isDendependentAdults"]) {
      onBehalfOf.push("dependent");
    }

    // Create signature object
    const signatureO = new Signature({
      onBehalfOf: onBehalfOf,
      name: data["lastNameS"] + data["firstNameS"],
      signaturePdf: data["signature"], // Assuming data["signature"] is a Buffer
      date: data["date"],
      homeTelephoneNo: data["homeTelNumber"],
      workTelephoneNo: data["workTelNumber"],
    });

    // Save the signature object to the database
    await signatureO.save();

    // Determine onBehalfOf values



const isParentB = data["isParentB"];
const isLegalGuardianB = data["isLegalGuardianB"];
const isAttorneyB = data["isAttorneyB"];

const isParent = data["isParent"];
const isLegalGuardian = data["isLegalGuardian"];
const isAttorney = data["isAttorney"];

let relationshipB = "";

if (isParentB) {
  relationshipB = "Parent";
} else if (isLegalGuardianB) {
  relationshipB = "legal guardian";
} else if (isAttorneyB) {
  relationshipB = "attorney for personal care";
}
let relationship = "";

if (isParent) {
  relationship = "Parent";
} else if (isLegalGuardian) {
  relationship = "legal guardian";
} else if (isAttorney) {
  relationship = "attorney for personal care";
}

const sendNoticesByRegularMail = data["sendNoticesByRegularMail"];
const sendNoticesByEmail = data["sendNoticesByEmail"];

let notices = "";

if (sendNoticesByRegularMail) {
  notices = "Regular Mail";
} else if (sendNoticesByEmail) {
  notices = "email";
} else {
  notices = ""; // Default value if none of the above are true
}

    // console.log(data);
    const pdfDoc = await PDFDocument.load(await readFile(input));

    const fields = pdfDoc.getForm().getFields();
    // console.log({fields});

    const fieldNames = pdfDoc
      .getForm()
      .getFields()
      .map((f) => f.getName());
    // console.log({fieldNames});

    const form = pdfDoc.getForm();
    // form.getTextField('Family Doctor Information').setText('Dr Farrell\n123 Hillview St\nOshawa, R1X 3D4')

   
   
    const fieldValues = {
      "Health Number": data["healthNumber"],
      Sex: data["sex"] === "female" ? "F" : "M",
      Code: data["versionCode"],
      myself: data["isMyself"],
      children: data["isChildren"],
      "dependent adults": data["isDendependentAdults"],
      "Second Name of adult patient": data["secondName"],
      "Street (Mailing address)": data["streetMailing"],
      "CityTown (Mailing address)": data["cityMailing"],
      "Postal Code (Mailing address)": data["postalCodeMailing"],
      "Email Address of adult submitting form": data["email"],
      "Last name of adult submitting form": data["lastName"],
      "First Name of adult submitting form": data["firstName"],
      "Apartment No. (Mailing address)": data["apartmentMailing"],
      "Date of Birth 1": data["dateOfBirth"].replace(/-/g, ""),
      Notices: notices,
      "Apartment (Residential address)": data["apartmentResidence"],
      "Street (Residential address)": data["streetResidence"],
      "CityTown (Residential address)": data["cityResidence"],
      "Postal code (Residential address)": data["postalCodeResidence"],
      Sex_A: data["childSex"] === "female" ? "Female" : "Male",
      "Different residential address": data["sameAsResidenceAddress"], // but its true-same as mail addr
      "Relationship A": relationship,
      "Last Name A": data["childLastName"],
      "First Name_A": data["childFirstName"],
      "Second Name_A": data["childSecondName"],
      "Health Number_A": data["childHealthNumber"],
      "Version code_A": data["childVersionCode"],
      "Apartment Mailing A": data["childApartmentMailing"],
      "Street Mailing A": data["childStreetMailing"],
      "Date of Birth yyyymmdd_2": data["childDateOfBirth"].replace(/-/g, ""),
      CityTown_Mailing_A: data["childCityMailing"],
      "Postal Code_A": data["childPostalCodeMailing"],
      Apartment_Residence_A: data["childApartmentResidence"],
      Street_Residence_A: data["childStreetResidence"],
      CityTown_Residence_A: data["childCityResidence"],
      "Postal Code_Residence_A": data["childPostalCodeResidence"],
      "Last Name B": data["childLastNameB"],
      "First Name_B": data["childFirstNameB"],
      "Second Name_B": data["childSecondNameB"],
      "Health Number_B": data["childHealthNumberB"],
      "Version code_B": data["childVersionCodeB"],
      Date_of_Birth_B: data["childDateOfBirthB"].replace(/-/g, ""),
      Sex_B: data["childSexB"] === "female" ? "Female" : "Male",
      "Relationship B": relationshipB,
      "Same Residence B": data["childSameAsResidenceAddressB"],
      "Same Mailing B": data["childSameAsMailingAddressB"],
      "Apartment Mailing B": data["childApartmentMailingB"],
      "Street Mailing B": data["childStreetMailingB"],
      CityTown_Mailing_B: data["childCityMailingB"],
      Apartment_Residence_B: data["childApartmentResidenceB"],
      Street_Residence_B: data["childStreetResidenceB"],
      CityTown_Residence_B: data["childCityResidenceB"],
      "Postal Code_Residence_B": data["childPostalCodeResidenceB"],
      Postal_Code_Mailing_B: data["childPostalCodeMailingB"],
      "Full name": data["lastNameS"] + data["firstNameS"],
      "Date signed": data["date"],
      "Work Telephone No": data["workTelNumber"],
      "Home or Mobile Telephone No": data["homeTelNumber"],
      "Same Residence_A": data["childSameAsResidenceAddress"],
      "Same Mailing_A": data["childSameAsMailingAddress"],
     "Signature1": { image: data["signature"], alt: "Digital Signature" },
      "Family Doctor Information":
        "Dr Farrell\n123 Hillview St\nOshawa, R1X 3D4",
    };

    
    // const field = form.getField(fieldName);
    // field.setText(value);
    for (const [fieldName, value] of Object.entries(fieldValues)) {
      const field = form.getField(fieldName);
      if (field) {
        // let constraints = '';
        // if (field instanceof PDFTextField) {
        //     constraints = `Max length: ${field.maxLength ?? 'Unlimited'}`;
        // } else if (field instanceof PDFRadioGroup) {
        //     constraints = `Options: ${field.getOptions().join(', ')}`;
        // }

        // console.log(`${fieldName} is a ${field.constructor.name} field. Constraints: ${constraints}`);

        if (field instanceof PDFTextField) {
          field.setText(value);
        } else if (field instanceof PDFRadioGroup) {
          field.select(value);
          // radioGroup options
          // const options = field.getOptions()
          // console.log('Radio Group options:', options)
        } else if (field instanceof PDFCheckBox) {
          // Check or uncheck the checkbox based on the value
          if (value) {
            field.check();
          } else {
            field.uncheck();
          }
          // console.log(value);
        }
      }
    }
// Embedding the signature image
const signatureUrl = data["signature"];
const signatureImage = await axios.get(signatureUrl, { responseType: "arraybuffer" });
const signatureImageEmbed = await pdfDoc.embedPng(signatureImage.data);

// Find the signature field and set the image
const signatureField = fields["Signature1"];
if (signatureField instanceof PDFSignature) {
    const signatureUrl = data["signature"];
    const signatureImage = await axios.get(signatureUrl, { responseType: "arraybuffer" });
    const signatureImageEmbed = await pdfDoc.embedPng(signatureImage.data);

    signatureField.setImage(signatureImageEmbed);
    signatureField.setAppearance(signatureImageEmbed);
}



    const pdfBytes = await pdfDoc.save();
    await writeFile(output, pdfBytes);
    console.log("PDF created!");

    let patientDetails = [];

// Save patient details for "self"
if (data["isMyself"]) {
  const dob = new Date(data["dob"]);
  
  const selfPatient = new Patient({
    lastName: data["lastName"],
    firstName: data["firstName"],
    secondName: data["secondName"],
    healthNumber: data["healthNumber"],
    versionCode: data["versionCode"],
    mailingAddress: mailingAddress,
    residentialAddress: residentialAddress,
    email: data["email"],
    dob: data["dob"],
    sex: data["sex"],
    noticesSent: notices,
    relationship: "self",
    signature: signatureO._id
  });
  patientDetails.push(selfPatient);
}

// Save patient details for "children"
if (data["isChildren"] && (data["isParent"])) {
  const childDob = new Date(data["childDateOfBirth"]);
  
  
  const childrenPatient = new Patient({
    lastName: data["childLastName"],
    firstName: data["childFirstName"],
    secondName: data["childSecondName"],
    healthNumber: data["childHealthNumber"],
    versionCode: data["childVersionCode"],
    mailingAddress: mailingAddressA,
    residentialAddress: residentialAddressA,
    dob: data["childDateOfBirth"],
    sex: data["childSex"],
    relationship: "children",
    signature: signatureO._id,
    parentLegalGuardianAttorney: relationship
  });
  patientDetails.push(childrenPatient);
}

// Save patient details for "dependent adults"
if (data["isDependentAdults"] && !(data["isChildren"])) {
  const dependentAdultDob = new Date(data["childDateOfBirthB"]);
  
  
  const dependentAdultsPatient = new Patient({
    lastName: data["childLastNameB"],
    firstName: data["childFirstNameB"],
    secondName: data["childSecondNameB"],
    healthNumber: data["childHealthNumberB"],
    versionCode: data["childVersionCodeB"],
    mailingAddress: mailingAddressB,
    residentialAddress: residentialAddressB,
    dob: data["childDateOfBirthB"],
    sex: data["childSexB"],
    relationship: "dependent",
    signature: signatureO._id,
    parentLegalGuardianAttorney: relationshipB
  });
  patientDetails.push(dependentAdultsPatient);
}

// Save all patient details
await Patient.insertMany(patientDetails);

  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createPdf,
};