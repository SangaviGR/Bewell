import React, { useState ,useEffect} from "react";
import { useForm } from "react-hook-form";
import axios from 'axios'; // Import axios for making HTTP requests
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SignatureCanvas from "react-signature-canvas";

function PatientEnrollmentForm() {
  const { register, handleSubmit, watch, setValue, getValues } = useForm();
  const [currentSection, setCurrentSection] = useState(1);
  const [sex, setSex] = useState(getValues("sex"));
    
  const today = new Date().toISOString().split("T")[0]; // Get current date in "YYYY-MM-DD" format
  const [childSex, setChildSex] = useState("");
  const [sameAsMailingAddress, setSameAsMailingAddress] = useState(false);
  const [childSameAsMailingAddress, setChildSameAsMailingAddress] =
    useState(false);
  const [childSameAsResidenceAddress, setChildSameAsResidenceAddress] =
    useState(false);
  const [sendNoticesByRegularMail, setSendNoticesByRegularMail] =
    useState(false);
  const [sendNoticesByEmail, setSendNoticesByEmail] = useState(false);
  const [isParent, setIsParent] = useState(false);
  const [isLegalGuardian, setIsLegalGuardian] = useState(false);
  const [isAttorney, setIsAttorney] = useState(false);
  const [isParentB, setIsParentB] = useState(false);
  const [isLegalGuardianB, setIsLegalGuardianB] = useState(false);
  const [isAttorneyB, setIsAttorneyB] = useState(false);
  const [childSexB, setChildSexB] = useState("");
  const [childSameAsMailingAddressB, setChildSameAsMailingAddressB] =
    useState(false);
  const [childSameAsResidenceAddressB, setChildSameAsResidenceAddressB] =
    useState(false);
  const [isMyself, setIsMyself] = useState(false);
  const [isChildren, setIsChildren] = useState(false);
  const [isDendependentAdults, setIsDendependentAdults] = useState(false);
  const [signature, setSignature] = useState('');
  const signatureCanvasRef = React.useRef();
  const [doctorDetails, setDoctorDetails] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/doctor/663ab4995925b827e43c7026'); // Replace ':id' with the actual doctor ID
        setDoctorDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDoctorDetails();
  }, []);

  const handleSaveSignature = () => {
    if (signatureCanvasRef.current) {
      const dataUrl = signatureCanvasRef.current.toDataURL();
      setValue('signature', dataUrl); // Set the form value
      setSignature(dataUrl); // Set the signature state
    }
  };
  const handleClearSignature = () => {
    setSignature('');
    setValue('signature', ''); // Clear the form value
    if (signatureCanvasRef.current) {
      signatureCanvasRef.current.clear();
    }
  };

  const onSubmit = async (data) => {
    try {
        // Submit data to the backend
        console.log(data);

        const signatureValue = data.signature || '';

        // Check if the signature has been saved
        if (signatureValue) {
            console.log('Signature has been saved:', signatureValue);
        } else {
            console.log('Signature has not been saved.');
        }

        // Send data to the backend using Axios
        const response = await axios.post('http://localhost:3001/api/submit-data', data, { responseType: 'blob' });

        console.log('Response from backend:', response);

        // Create a URL for the blob
        const url = URL.createObjectURL(response.data);

        // Create a link element
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.pdf'; // Set the filename for download
        a.click(); // Trigger the click event to start download
    } catch (error) {
        console.error('Error submitting data:', error);
        alert(`Error: ${error.response.data.message}`); // Display the error message in an alert
    }
};



  const handleSameAsSection1ChangeResidence = (e) => {
    const isSameAsSection1 = e.target.checked;

    if (isSameAsSection1) {
      setValue("childApartmentResidence", getValues("apartmentResidence"));
      setValue("childStreetResidence", getValues("streetResidence"));
      setValue("childCityResidence", getValues("cityResidence"));
      setValue("childPostalCodeResidence", getValues("postalCodeResidence"));
    } else {
      setValue("childApartmentResidence", "");
      setValue("childStreetResidence", "");
      setValue("childCityResidence", "");
      setValue("childPostalCodeResidence", "");
    }
    setChildSameAsResidenceAddress(isSameAsSection1);
  };

  const handleSameAsSection1ChangeBResidence = (e) => {
    const isSameAsSection1 = e.target.checked;

    if (isSameAsSection1) {
      setValue("childApartmentResidenceB", getValues("apartmentResidence"));
      setValue("childStreetResidenceB", getValues("streetResidence"));
      setValue("childCityResidenceB", getValues("cityResidence"));
      setValue("childPostalCodeResidenceB", getValues("postalCodeResidence"));
    } else {
      setValue("childApartmentResidenceB", "");
      setValue("childStreetResidenceB", "");
      setValue("childCityResidenceB", "");
      setValue("childPostalCodeResidenceB", "");
    }
    setChildSameAsResidenceAddressB(isSameAsSection1);
  };

  const handleResidenceAddressChange = (e) => {
    const isSameAsMailing = e.target.checked;

    if (isSameAsMailing) {
      setValue("apartmentResidence", watch("apartmentMailing"));
      setValue("streetResidence", watch("streetMailing"));
      setValue("cityResidence", watch("cityMailing"));
      setValue("postalCodeResidence", watch("postalCodeMailing"));
    } else {
      setValue("apartmentResidence", "");
      setValue("streetResidence", "");
      setValue("cityResidence", "");
      setValue("postalCodeResidence", "");
    }
    setSameAsMailingAddress(isSameAsMailing);
  };

  const handleSameAsSection1Change = (e) => {
    const isSameAsSection1 = e.target.checked;

    if (isSameAsSection1) {
      setValue("childApartmentMailing", getValues("apartmentMailing"));
      setValue("childStreetMailing", getValues("streetMailing"));
      setValue("childCityMailing", getValues("cityMailing"));
      setValue("childPostalCodeMailing", getValues("postalCodeMailing"));
    } else {
      setValue("childApartmentMailing", "");
      setValue("childStreetMailing", "");
      setValue("childCityMailing", "");
      setValue("childPostalCodeMailing", "");
    }
    setChildSameAsMailingAddress(isSameAsSection1);
  };

  const handleSameAsSection1ChangeB = (e) => {
    const isSameAsSection1 = e.target.checked;

    if (isSameAsSection1) {
      setValue("childApartmentMailingB", getValues("apartmentMailing"));
      setValue("childStreetMailingB", getValues("streetMailing"));
      setValue("childCityMailingB", getValues("cityMailing"));
      setValue("childPostalCodeMailingB", getValues("postalCodeMailing"));
    } else {
      setValue("childApartmentMailingB", "");
      setValue("childStreetMailingB", "");
      setValue("childCityMailingB", "");
      setValue("childPostalCodeMailingB", "");
    }
    setChildSameAsMailingAddressB(isSameAsSection1);
  };

  const handleNextSection = () => {
    setCurrentSection((prevSection) => prevSection + 1);
  };

  const handlePreviousSection = () => {
    setCurrentSection((prevSection) => prevSection - 1);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ width: "100%", left: 0, right: 0 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Patient Enrollment and Consent to Release Personal Health
            Information
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ width: "100%", left: 0, right: 0 }}>
        <Box sx={{ flexGrow: 1, mt: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {currentSection === 1 && (
              <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4">Section 1</Typography>
                <Typography>
                  I want to enroll myself with the family Doctor identified in
                  Section 4.
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Health Number"
                      {...register("healthNumber")}
                      fullWidth
                      style={{ width: "100%" }}
                      
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Version Code (2 characters)"
                      {...register("versionCode", { maxLength: 2 })}
                      fullWidth
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1">
                          Date of Birth
                        </Typography>
                        <TextField
                          type="Date"
                          {...register("dateOfBirth")}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1">Sex</Typography>

                        <RadioGroup
                          {...register("sex")} // Register the 'sex' field with react-hook-form
                          onChange={(e) => {
                            setSex(e.target.value);
                          }}
                        >
                          <FormControlLabel
                            {...register("sex")} // Register each radio button option with react-hook-form
                            value="male"
                            control={<Radio />}
                            label="Male"
                          />
                          <FormControlLabel
                            {...register("sex")} // Register each radio button option with react-hook-form
                            value="female"
                            control={<Radio />}
                            label="Female"
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Last Name"
                      {...register("lastName")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="First Name"
                      {...register("firstName")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Second Name"
                      {...register("secondName")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Mailing Address</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Apartment"
                      {...register("apartmentMailing")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Street"
                      {...register("streetMailing")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="City"
                      {...register("cityMailing")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Postal Code"
                      {...register("postalCodeMailing")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      Residence Address
                    </Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={sameAsMailingAddress}
                          {...register("sameAsResidenceAddress")}
                          onChange={(e) => {
                            handleResidenceAddressChange(e);
                            setSameAsMailingAddress(e.target.checked);
                          }}
                        />
                      }
                      label="Same as Mailing Address"
                    />
                  </Grid>
                  {!sameAsMailingAddress && (
                    <>
                      <Grid item xs={6}>
                        <TextField
                          label="Apartment"
                          {...register("apartmentResidence")}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Street"
                          {...register("streetResidence")}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="City"
                          {...register("cityResidence")}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Postal Code"
                          {...register("postalCodeResidence")}
                          fullWidth
                        />
                      </Grid>
                    </>
                  )}

                  <Grid item xs={12}>
                    <TextField
                      label="Email Address"
                      {...register("email")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      Notices from my family Doctor's office to me
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={sendNoticesByRegularMail}
                              {...register("sendNoticesByRegularMail")}
                              onChange={(e) =>
                                setSendNoticesByRegularMail(e.target.checked)
                              }
                            />
                          }
                          label="Regular Mail"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={sendNoticesByEmail}
                              {...register("sendNoticesByEmail")}
                              onChange={(e) =>
                                setSendNoticesByEmail(e.target.checked)
                              }
                            />
                          }
                          label="Email"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            )}

            {currentSection === 2 && (
              <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4">Section 2</Typography>
                <Typography>
                  I want to enroll my child/children under 16 and dependent
                  adults with the family Doctor identified in Section 4.
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Label A</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          label="Health Number"
                          {...register("childHealthNumber")}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Version Code (2 characters)"
                          {...register("childVersionCode", { maxLength: 2 })}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1">
                          Date of Birth
                        </Typography>
                        <TextField
                          type="Date"
                          {...register("childDateOfBirth")}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1">Sex</Typography>
                        <RadioGroup
                          {...register("childSex")} // Register the 'sex' field with react-hook-form
                          onChange={(e) => {
                            setChildSex(e.target.value);
                          }}
                        >
                          <FormControlLabel
                            {...register("childSex")} // Register each radio button option with react-hook-form
                            value="male"
                            control={<Radio />}
                            label="Male"
                          />
                          <FormControlLabel
                            {...register("childSex")} // Register each radio button option with react-hook-form
                            value="female"
                            control={<Radio />}
                            label="Female"
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Last Name"
                      {...register("childLastName")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="First Name"
                      {...register("childFirstName")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Second Name"
                      {...register("childSecondName")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Mailing Address</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={childSameAsMailingAddress}
                              {...register("childSameAsMailingAddress")}
                              onChange={(e) => {
                                handleSameAsSection1Change(e);
                                setChildSameAsMailingAddress(e.target.checked);
                              }}
                            />
                          }
                          label="Same as Section 1"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Apartment"
                          {...register("childApartmentMailing")}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Street"
                          {...register("childStreetMailing")}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="City"
                          {...register("childCityMailing")}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Postal Code"
                          {...register("childPostalCodeMailing")}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      Residence Address
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={childSameAsResidenceAddress}
                              {...register("childSameAsResidenceAddress")}
                              onChange={(e) => {
                                handleSameAsSection1ChangeResidence(e);
                                setChildSameAsResidenceAddress(
                                  e.target.checked
                                );
                              }}
                            />
                          }
                          label="Same as Section 1"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Apartment"
                          {...register("childApartmentResidence")}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Street"
                          {...register("childStreetResidence")}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="City"
                          {...register("childCityResidence")}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Postal Code"
                          {...register("childPostalCodeResidence")}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      I am this person's
                    </Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isParent}
                          {...register("isParent")}
                          onChange={(e) => {
                            setIsParent(e.target.checked);
                            setValue("isParent", e.target.value);
                          }}
                        />
                      }
                      label="Parent"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isLegalGuardian}
                          {...register("isLegalGuardian")}
                          onChange={(e) => {
                            setIsLegalGuardian(e.target.checked);
                            setValue("isLegalGuardian", e.target.value);
                          }}
                        />
                      }
                      label="Legal Guardian"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isAttorney}
                          {...register("isAttorney")}
                          onChange={(e) => {
                            setIsAttorney(e.target.checked);
                            setValue("isAttorney", e.target.value);
                          }}
                        />
                      }
                      label="Attorney for Personal Care"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Label B</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          label="Health Number"
                          {...register("childHealthNumberB")}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Version Code (2 characters)"
                          {...register("childVersionCodeB", { maxLength: 2 })}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1">
                          Date of Birth
                        </Typography>
                        <TextField
                          {...register("childDateOfBirthB")}
                          type="date"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1">Sex</Typography>
                        <RadioGroup
                          {...register("childSexB")} // Register the 'sex' field with react-hook-form
                          onChange={(e) => {
                            setChildSexB(e.target.value);
                          }}
                        >
                          <FormControlLabel
                            {...register("childSexB")} // Register each radio button option with react-hook-form
                            value="male"
                            control={<Radio />}
                            label="Male"
                          />
                          <FormControlLabel
                            {...register("childSexB")} // Register each radio button option with react-hook-form
                            value="female"
                            control={<Radio />}
                            label="Female"
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Last Name"
                      {...register("childLastNameB")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="First Name"
                      {...register("childFirstNameB")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Second Name"
                      {...register("childSecondNameB")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Mailing Address</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={childSameAsMailingAddressB}
                              {...register("childSameAsMailingAddressB")}
                              onChange={(e) => {
                                handleSameAsSection1ChangeB(e);
                                setChildSameAsMailingAddressB(e.target.checked);
                              }}
                            />
                          }
                          label="Same as Section 1"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Apartment"
                          {...register("childApartmentMailingB")}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Street"
                          {...register("childStreetMailingB")}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="City"
                          {...register("childCityMailingB")}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Postal Code"
                          {...register("childPostalCodeMailingB")}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      Residence Address
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={childSameAsResidenceAddressB}
                              {...register("childSameAsResidenceAddressB")}
                              onChange={(e) => {
                                handleSameAsSection1ChangeBResidence(e);
                                setChildSameAsResidenceAddressB(
                                  e.target.checked
                                );
                              }}
                            />
                          }
                          label="Same as Section 1"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Apartment"
                          {...register("childApartmentResidenceB")}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Street"
                          {...register("childStreetResidenceB")}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="City"
                          {...register("childCityResidenceB")}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Postal Code"
                          {...register("childPostalCodeResidenceB")}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      I am this person's
                    </Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isParentB}
                          {...register("isParentB")}
                          onChange={(e) => {
                            setIsParentB(e.target.checked);
                            setValue("isParentB", e.target.value);
                          }}
                        />
                      }
                      label="Parent"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isLegalGuardianB}
                          {...register("isLegalGuardianB")}
                          onChange={(e) =>
                            setIsLegalGuardianB(e.target.checked)
                          }
                        />
                      }
                      label="Legal Guardian"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isAttorneyB}
                          {...register("isAttorneyB")}
                          onChange={(e) => {
                            setIsAttorneyB(e.target.checked);
                            setValue("isAttorneyB", e.target.value);
                          }}
                        />
                      }
                      label="Attorney for Personal Care"
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {currentSection === 3 && (
              <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4">Section 3</Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        border: "1px solid #ccc",
                        padding: 2,
                        marginBottom: 2,
                      }}
                    >
                      <Typography>
                        I have read and agree to the patient commitment, the
                        consent to release personal health information, and the
                        cancellation conditions on the back of this form. I
                        acknowledge that this enrollment is not intended to be a
                        legally binding contract and is not intended to give
                        rise to any new legal obligations between my family
                        Doctor and me.
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      I am signing on behalf of
                    </Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isMyself}
                          {...register("isMyself")}
                          onChange={(e) => setIsMyself(e.target.checked)}
                        />
                      }
                      label="Myself"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChildren}
                          {...register("isChildren")}
                          onChange={(e) => setIsChildren(e.target.checked)}
                        />
                      }
                      label="Children"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isDendependentAdults}
                          {...register("isDendependentAdults")}
                          onChange={(e) => {
                            setIsDendependentAdults(e.target.checked);
                            setValue("isDendependentAdults", e.target.value);
                          }}
                        />
                      }
                      label="Dendependent Adults"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Name</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          {...register("lastNameS")}
                          label="Last Name"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          {...register("firstNameS")}
                          label="First Name"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                  <Typography variant="subtitle1">Signature</Typography>
      {signature ? (
        <img src={signature} alt="Saved Signature" />
      ) : (
        <SignatureCanvas
          penColor="black"
          canvasProps={{
            width: 500,
            height: 200,
            className: 'sigCanvas',
          }}
          ref={signatureCanvasRef}
        />
      )}
      <Button variant="contained" onClick={handleClearSignature}>
        Clear Signature
      </Button>
      <Button variant="contained" onClick={handleSaveSignature}>
        Save Signature
      </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Today's Date</Typography>
                    <TextField
                      {...register("date")}
                      type="date"
                      fullWidth
                      defaultValue={today}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      Telephone Numbers
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          {...register("homeTelNumber")}
                          label="Home Telephone Number"
                          type="tel"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          {...register("workTelNumber")}
                          label="Work Telephone Number"
                          type="tel"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              {currentSection > 1 && currentSection < 4 &&(
                <Button onClick={handlePreviousSection} variant="outlined">
                  Previous
                </Button>
              )}
              {currentSection < 4 && (
                <Button onClick={handleNextSection} variant="outlined">
                  Next
                </Button>
              )}
            
            {currentSection === 4 && (
  <Box sx={{ marginBottom: 2 }}>
    <Typography variant="h4" sx={{ marginBottom: 2 }}>Section 4</Typography>

    {/* Doctor's Information */}
    {doctorDetails && (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>Family doctor information</Typography>
          <div sx={{ marginBottom: 2 }}>
            <TextField
              label="Doctor's Name"
              value={doctorDetails.name || ''}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </div>
          <div sx={{ marginBottom: 2 }}>
            <TextField
              label="Address"
              value={doctorDetails.address || ''}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </div>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>Date</Typography>
          <TextField
            value={new Date().toLocaleDateString()}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>Doctor's Signature</Typography>
          <img src={doctorDetails.signature} alt="Doctor's Signature" />
        </Grid>
      </Grid>
    )}

    {/* Previous and Submit buttons */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 2,
      }}
    >
      {currentSection > 1 && (
        <Button onClick={handlePreviousSection} variant="outlined">
          Previous
        </Button>
      )}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  </Box>
)}


            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}
export default PatientEnrollmentForm;
