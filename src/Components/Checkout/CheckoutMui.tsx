import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./Payment";
import { translations } from "../../utils/translations";
import { useBasket } from "../../Contexts/Basket/BasketContext";
import Cookies from "js-cookie";
import { basketCookieName } from "../../utils/constants";

const steps = ["Shipping address", "Payment details"];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    default:
      throw new Error("Unknown step");
  }
}

const defaultTheme = createTheme();

const CheckoutMui = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { setBasketItems } = useBasket();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resetBasket = () => {
    setBasketItems([]);
    Cookies.remove(basketCookieName, { path: "" });
  };

  useEffect(() => {
    if (activeStep === steps.length) {
      resetBasket();
    }
  }, [activeStep, resetBasket]);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            {translations.checkoutMui.mainTitle}
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                {translations.checkoutMui.finalTile}
              </Typography>
              <Typography variant="subtitle1">
                {translations.checkoutMui.OrderText}
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    {translations.checkoutMui.buttonBackText}
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1
                    ? translations.checkoutMui.buttonOrderText
                    : translations.checkoutMui.buttonNextText}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default CheckoutMui;
