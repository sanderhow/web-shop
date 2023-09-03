import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { translations } from "../../utils/translations";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { userDataCookieName } from "../../utils/constants";

const steps = ["Shipping address", "Payment details"];

interface IAddressForm {
  handleBack: () => void;
  activeStep: number;
  handleNext: () => void;
}

interface FormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  address1?: string;
  address2?: string;
  zip?: string;
  city?: string;
  country?: string;
}

const AddressForm: React.FC<IAddressForm> = ({ activeStep, handleNext }) => {
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(3, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    address1: Yup.string()
      .min(5, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    address2: Yup.string().min(0, "Too Short!").max(15, "Too Long!"),
    zip: Yup.string()
      .min(2, "Too Short!")
      .max(7, "Too Long!")
      .required("Required"),
    city: Yup.string()
      .min(3, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    country: Yup.string()
      .min(3, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
  });

  const getFinalText = (): FormData => {
    const readCookie = Cookies.get(userDataCookieName);
    let readCookieObj;
    if (readCookie) {
      readCookieObj = JSON.parse(readCookie);
      return { ...readCookieObj };
    } else
      return {
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        email: "",
        city: "",
        zip: "",
        country: "",
      };
  };

  return (
    <React.Fragment>
      <Grid sx={{ p: 1 }}>
        <Formik
          initialValues={getFinalText()}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            const jsonFavouritesCookie = JSON.stringify({ ...values });
            Cookies.set(userDataCookieName, jsonFavouritesCookie, {
              expires: 2000,
            });

            handleNext();
          }}
        >
          {({ errors, touched, values, handleBlur, handleChange }) => (
            <Form>
              <Grid sx={{ pb: 1 }}>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First name"
                  type="text"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>
              <Grid sx={{ pb: 1 }}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  type="text"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>
              <Grid sx={{ pb: 1 }}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="E-mail address"
                  type="email"
                  fullWidth
                  variant="standard"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid sx={{ pb: 1 }}>
                <TextField
                  required
                  id="address1"
                  name="address1"
                  label="Address line 1"
                  type="text"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
                  value={values.address1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.address1 && Boolean(errors.address1)}
                  helperText={touched.address1 && errors.address1}
                />
              </Grid>
              <Grid sx={{ pb: 1 }}>
                <TextField
                  required
                  id="address2"
                  name="address2"
                  label="Address line 2"
                  type="text"
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                  value={values.address2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.address2 && Boolean(errors.address2)}
                  helperText={touched.address2 && errors.address2}
                />
              </Grid>
              <Grid sx={{ pb: 1 }}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  type="number"
                  fullWidth
                  autoComplete="shipping postal-code"
                  variant="standard"
                  value={values.zip}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.zip && Boolean(errors.zip)}
                  helperText={touched.zip && errors.zip}
                />
              </Grid>
              <Grid sx={{ pb: 1 }}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  type="text"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.city && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                />
              </Grid>
              <Grid sx={{ pb: 1 }}>
                <TextField
                  required
                  id="country"
                  name="country"
                  label="Country"
                  defaultValue="Poland"
                  fullWidth
                  variant="standard"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.country && Boolean(errors.country)}
                  helperText={touched.country && errors.zip}
                />
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 6, ml: "auto", float: "right" }}
              >
                {activeStep === steps.length - 1
                  ? translations.checkoutMui.buttonOrderText
                  : translations.checkoutMui.buttonNextText}
              </Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </React.Fragment>
  );
};

export default AddressForm;
