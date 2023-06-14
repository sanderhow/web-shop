import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, MenuItem, Stack, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import * as P from './parts';

const country = [
    {
      value: 'Poland',
      label: 'Poland',
    },
    {
      value: 'Germany',
      label: 'Germany',
    },
    {
      value: 'Italy',
      label: 'Italy',
    },
    {
      value: 'Spain',
      label: 'Spain',
    },
    {
        value: 'Germany',
        label: 'Germany',
      },
    {
        value: 'Ukraine',
        label: 'Ukraine',
    },
  ];

const CheckoutForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      country:'',
      address: '',
      postalCode: '',
      city: '',
      phone: ''
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
      <Box
      component="form"
      sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
        <form onSubmit={formik.handleSubmit}>
    <P.FormWrapper>
        {/* <P.FormWrapper1> */}
            <TextField type="text" id="firstName" label="First name" variant="outlined" 
                required
                onChange={formik.handleChange}
                value={formik.values.firstName}
                />
            <TextField type={"email"} id="email" label="E-mail" variant="outlined" 
                required
                onChange={formik.handleChange}
                value={formik.values.email}
                />
            <TextField type="text" id="address" label="Address" variant="outlined" 
                required
                onChange={formik.handleChange}
                value={formik.values.address}
                />
            <TextField type="text" id="city" label="City" variant="outlined" 
                required
                onChange={formik.handleChange}
                value={formik.values.city}
                />
        {/* </P.FormWrapper1> */}
        {/* <P.FormWrapper2> */}
            <TextField type="text" id="lastName" label="Last name" variant="outlined" 
                required
                onChange={formik.handleChange}
                value={formik.values.lastName}
                />
            <TextField
            required
            id="country"
            select
            label="Country"
            defaultValue="Poland"
            helperText="Please select your country"
            >
            {country.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
            ))}
            </TextField>
            <TextField type="number" id="postalCode" label="Postal Code" variant="outlined"
                required 
                onChange={formik.handleChange}
                value={formik.values.postalCode}
                />
            <TextField type="number" id="phone" label="Phone number" variant="outlined"
                required 
                onChange={formik.handleChange}
                value={formik.values.phone}
                />
        {/* </P.FormWrapper2> */}
    </P.FormWrapper>
            {/* <Stack direction="row" spacing={2}> */}
                <Button size="large" variant="contained" endIcon={<SendIcon />}>
                    Submit
                </Button>
            {/* </Stack> */}
        </form>
    </Box>
  );
};

export default CheckoutForm;