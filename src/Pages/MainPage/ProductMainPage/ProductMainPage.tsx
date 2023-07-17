import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button/Button";
import Typography from "../../../Components/Typography/Typography";
import { useMediaQuery } from "@mui/material";
import { translations } from "../../../utils/translations";
import ProductMainPageLayout from "./ProductMainPageLayout";

const backgroundImage =
  "https://images.squarespace-cdn.com/content/v1/5a9316f3ec4eb7af0927c395/1623753550865-V46BDME5QXAROCT94RLP/Get+in+touch+to+book+a+shoot";

export default function ProductMainPage() {
  const isMobileScreen = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const goToListingPage = () => {
    navigate(`/listing`);
  };

  return (
    <ProductMainPageLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
      }}
    >
      <Typography
        sx={{ fontWeight: "bold" }}
        color="inherit"
        align="center"
        variant={isMobileScreen ? "h2" : "h1"}
      >
        {translations.mainPage.mainTitle}
      </Typography>
      <Typography
        sx={{ fontWeight: "bold", fontSize: 32 }}
        color="inherit"
        align="center"
        variant="h2"
        marked="center"
      >
        {translations.mainPage.subTitle}
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        {translations.mainPage.adText}
      </Typography>
      <Button
        onClick={goToListingPage}
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        sx={{ minWidth: 200 }}
      >
        {translations.mainPage.buttonText}
      </Button>
    </ProductMainPageLayout>
  );
}
