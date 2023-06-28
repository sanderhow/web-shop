import {
  alpha,
  Avatar,
  Box,
  Drawer,
  Link,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { useUser } from "../../Contexts/Auth/UserData";
import NavSection from "../Nav-section/NavSection";
import * as P from "./parts";
import { stringAvatar } from "../../utils/utils";
import useMediaQuery from "@mui/material/useMediaQuery";

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));
const NAV_WIDTH = 280;
const navConfig = [
  {
    title: "Main page",
    path: "/",
  },
  {
    title: "Favourites",
    path: "/favourites",
  },
  {
    title: "Basket",
    path: "/basket",
  },

  {
    title: "Listing",
    path: "/listing",
  },
  {
    title: "Checkout",
    path: "/checkout",
  },
];

interface INavbarProps {
  isMenuClicked: boolean;
  setIsMenuClicked: (a: boolean) => void;
}

const Navbar: React.FC<INavbarProps> = ({
  isMenuClicked,
  setIsMenuClicked,
}) => {
  const { userItems, isAuth } = useUser();
  const isMobileScreen = useMediaQuery("(max-width:800px)");
  const renderContent = (
    <div>
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }} />

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            {userItems && isAuth ? (
              <Avatar
                {...stringAvatar(
                  `${userItems.name.firstname} ${userItems.name.lastname}`
                )}
              />
            ) : (
              <Typography
                sx={{ fontSize: 16, fontWeight: "bold" }}
                component="h2"
              >
                welcome back!
              </Typography>
            )}

            <Box sx={{ ml: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: "text.#3f51b5", fontWeight: "bold" }}
              >
                {userItems?.name.firstname.toUpperCase()}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "text.#3f51b5", fontWeight: "bold" }}
              >
                {userItems?.name.lastname.toUpperCase()}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>
      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </div>
  );
  return (
    <P.Wrapper>
      {isMobileScreen ? (
        <Drawer
          open={isMenuClicked}
          variant="temporary"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
          onClose={() => setIsMenuClicked(false)}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </P.Wrapper>
  );
};

export default Navbar;
