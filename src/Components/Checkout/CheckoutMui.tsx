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
import { basketCookieName, userDataCookieName } from "../../utils/constants";
import { useMediaQuery } from "@mui/material";

const steps = ["Shipping address", "Payment details"];

function getStepContent(
  step: number,
  handleBack: () => void,
  handleNext: () => void
) {
  switch (step) {
    case 0:
      return (
        <AddressForm
          activeStep={step}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      );
    case 1:
      return (
        <PaymentForm
          activeStep={step}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      );
    default:
      throw new Error("Unknown step");
  }
}

const defaultTheme = createTheme();

const CheckoutMui = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { setBasketItems } = useBasket();
  const isMobileScreen = useMediaQuery("(max-width:600px)");

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

  const getFinalText = () => {
    const readCookie = Cookies.get(userDataCookieName);
    let readCookieObj;
    if (readCookie) {
      readCookieObj = JSON.parse(readCookie);
    }

    return `${readCookieObj.firstName} ${readCookieObj.lastName}, ${translations.checkoutMui.finalTile}`;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined">
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
                {getFinalText()}
              </Typography>
              <Typography variant="subtitle1">
                {translations.checkoutMui.OrderText}
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, handleBack, handleNext)}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 2,
                  mb: 2,
                }}
              >
                {activeStep !== 0 && (
                  <Button
                    onClick={handleBack}
                    sx={{
                      ml: isMobileScreen ? 0 : "auto",
                      float: isMobileScreen ? "left" : "right",
                      mr: isMobileScreen ? "auto" : "0",
                      mt: isMobileScreen ? "2" : "0",
                      pd: isMobileScreen ? "0" : "0",
                    }}
                  >
                    {translations.checkoutMui.buttonBackText}
                  </Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default CheckoutMui;
