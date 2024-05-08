// import React from 'react';
// import { Typography, Grid, TextField, RadioGroup, FormControlLabel, Radio ,Box,Checkbox} from '@mui/material';

// function Section1({ sendNoticesByRegularMail, sendNoticesByEmail, register, sex, setSex, sameAsMailingAddress, setSameAsMailingAddress, setValue, watch }) {

//   return (
//     <Box sx={{ marginBottom: 2 }}>
//             <Typography variant="h4">Section 1</Typography>
//             <Typography>I want to enroll myself with the family Doctor identified in Section 4.</Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <TextField label="Health Number" {...register('healthNumber')} fullWidth style={{ width: '100%' }} />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField label="Version Code (2 characters)" {...register('versionCode', { maxLength: 2 })} fullWidth style={{ width: '100%' }} />
//               </Grid>
//               <Grid item xs={12}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={6}>
//                   <Typography variant="subtitle1">Date of Birth</Typography>
//                     <TextField type="Date" {...register('dateOfBirth')} fullWidth />
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="subtitle1">Sex</Typography>
//                     <RadioGroup
//                       value={sex}
//                       onChange={(e) => setSex(e.target.value)}
//                       row
//                     >
//                       <FormControlLabel value="male" control={<Radio />} label="Male" />
//                       <FormControlLabel value="female" control={<Radio />} label="Female" />
//                     </RadioGroup>
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField label="Last Name" {...register('lastName')} fullWidth />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField label="First Name" {...register('firstName')} fullWidth />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField label="Second Name" {...register('secondName')} fullWidth />
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="subtitle1">Mailing Address</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField label="Apartment" {...register('apartmentMailing')} fullWidth />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField label="Street" {...register('streetMailing')} fullWidth />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField label="City" {...register('cityMailing')} fullWidth />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField label="Postal Code" {...register('postalCodeMailing')} fullWidth />
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="subtitle1">Residence Address</Typography>
//                 <FormControlLabel
//   control={<Checkbox checked={sameAsMailingAddress} onChange={(e) => setSameAsMailingAddress(e.target.checked)} />}
//   label="Same as Mailing Address"
// />
//               </Grid>
//               {!sameAsMailingAddress && (
//                 <>
//                   <Grid item xs={6}>
//                     <TextField label="Apartment" {...register('apartmentResidence')} fullWidth />
//                   </Grid>
//                   <Grid item xs={6}>
//                     <TextField label="Street" {...register('streetResidence')} fullWidth />
//                   </Grid>
//                   <Grid item xs={6}>
//                     <TextField label="City" {...register('cityResidence')} fullWidth />
//                   </Grid>
//                   <Grid item xs={6}>
//                     <TextField label="Postal Code" {...register('postalCodeResidence')} fullWidth />
//                   </Grid>
//                 </>
//               )}

//               <Grid item xs={12}>
//                 <TextField label="Email Address" {...register('email')} fullWidth />
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="subtitle1">Notices from my family Doctor's office to me</Typography>
//                 <Grid container spacing={2}>
//                   <Grid item xs={6}>
//                   <FormControlLabel
//   control={<Checkbox checked={sendNoticesByRegularMail} onChange={(e) => setSendNoticesByRegularMail(e.target.checked)} />}
//   label="Regular Mail"
// />

//                   </Grid>
//                   <Grid item xs={6}>
//                   <FormControlLabel
//   control={<Checkbox checked={sendNoticesByEmail} onChange={(e) => setSendNoticesByEmail(e.target.checked)} />}
//   label="Email"
// />
//                   </Grid>
//                 </Grid>
//               </Grid>
             
//             </Grid>

//           </Box>
//   );
// }

// export default Section1;
