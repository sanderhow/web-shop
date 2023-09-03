import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { translations } from "../../utils/translations";
import { Button } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { userDataCookieName } from "../../utils/constants";

const steps = ["Shipping address", "Payment details"];

interface IPaymentForm {
  handleNext: () => void;
  handleBack: () => void;
  activeStep: number;
}

const PaymentForm: React.FC<IPaymentForm> = ({
  activeStep,
  handleNext,
  handleBack
}) => {
  const SignupSchema = Yup.object().shape({
    cardName: Yup.string()
      .min(4, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    cardNumber: Yup.string()
      .min(4, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    expDate: Yup.string()
      .min(3, "Too Short!")
      .max(5, "Too Long!")
      .required("Required"),
    cvv: Yup.string()
      .min(1, "Too Short!")
      .max(4, "Too Long!")
      .required("Required"),
  });

  return (
    <React.Fragment>
      <Grid sx={{ p: 1 }}>
        <Formik
          initialValues={{
            cardName: "",
            cardNumber: "",
            expDate: "",
            cvv: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            const readCookie = Cookies.get(userDataCookieName);
            let readCookieObj;
            if (readCookie) {
              readCookieObj = JSON.parse(readCookie);
            }
            const mergedObj = { ...readCookieObj, ...values };
            const jsonFavouritesCookie = JSON.stringify({ ...mergedObj });
            Cookies.set(userDataCookieName, jsonFavouritesCookie, {
              expires: 2000,
            });

            //TODO: send Payload with userData and items from a basket to API.

            handleNext();
          }}
        >
          {({ errors, touched, values, handleBlur, handleChange }) => (
            <Form>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  type="text"
                  id="cardName"
                  label="Name on card"
                  fullWidth
                  autoComplete="cc-name"
                  variant="standard"
                  value={values.cardName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.cardName && Boolean(errors.cardName)}
                  helperText={touched.cardName && errors.cardName}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  type="number"
                  id="cardNumber"
                  label="Card number"
                  fullWidth
                  autoComplete="cc-number"
                  variant="standard"
                  value={values.cardNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.cardNumber && Boolean(errors.cardNumber)}
                  helperText={touched.cardNumber && errors.cardNumber}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  type="number"
                  id="expDate"
                  label="Expiry date"
                  fullWidth
                  autoComplete="cc-exp"
                  variant="standard"
                  value={values.expDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.expDate && Boolean(errors.expDate)}
                  helperText={touched.expDate && errors.expDate}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  type="number"
                  id="cvv"
                  label="CVV"
                  fullWidth
                  autoComplete="cc-csc"
                  variant="standard"
                  value={values.cvv}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.cvv && Boolean(errors.cvv)}
                  helperText={touched.cvv && errors.cvv}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox color="secondary" name="saveCard" value="yes" />
                  }
                  label={translations.paymentForm.label}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, ml: "auto", float: "right" }}
                >
                  {activeStep === steps.length - 1
                    ? translations.checkoutMui.buttonOrderText
                    : translations.checkoutMui.buttonNextText}
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </React.Fragment>
  );
};

export default PaymentForm;
