import React from 'react';
import { Typography, Grid, TextField, RadioGroup, FormControlLabel, Radio, Checkbox ,Box} from '@mui/material';

function Section2({ register, childSex, setChildSex, childSameAsMailingAddress, setChildSameAsMailingAddress, setValue, watch }) {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h4">Section 2</Typography>
      <Typography>I want to enroll my child/children under 16 and dependent adults with the family Doctor identified in Section 4.</Typography>
      {/* Add the rest of the fields */}
    </Box>
  );
}

export default Section2;
