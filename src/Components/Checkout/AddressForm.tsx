import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { MenuItem } from "@mui/material";
import { translations } from "../../utils/translations";

const country = [
  {
    value: "Poland",
    label: "Poland",
  },
  {
    value: "Germany",
    label: "Germany",
  },
  {
    value: "Italy",
    label: "Italy",
  },
  {
    value: "Spain",
    label: "Spain",
  },
  {
    value: "Germany",
    label: "Germany",
  },
  {
    value: "Ukraine",
    label: "Ukraine",
  },
];

const AddressForm = () => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {translations.addressForm.shippingAddress}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            type="text"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            type="text"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            type="text"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address2"
            name="address2"
            label="Address line 2"
            type="text"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="E-mail address"
            type={"email"}
            fullWidth
            variant="standard"
          />
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              type="text"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            type="number"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            defaultValue="Poland"
            fullWidth
            variant="standard"
            helperText="Please select your country"
          >
            {country.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label={translations.addressForm.label}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AddressForm;
