import { styled } from "@mui/material/styles";
import { Box, Stack, Toolbar, IconButton } from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import BasketHeader from "../BasketHeader/BasketHeader";
import FavouriteHeader from "../FavouriteHeader/FavouriteHeader";
import UserHeader from "../User/UserHeader";
import useMediaQuery from "@mui/material/useMediaQuery";

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

interface IHeaderNavProps {
  handleClickMenu: () => void;
}

const Header: React.FC<IHeaderNavProps> = ({ handleClickMenu }) => {
  const isMobileScreen = useMediaQuery("(max-width:600px)");
  const isTabletScreen = useMediaQuery("(max-width:1000px)");

  return (
    <StyledToolbar
      sx={{
        justifyContent:
          isMobileScreen || isTabletScreen ? "space-between" : "flex-end",
      }}
    >
      {isMobileScreen || isTabletScreen ? (
        <IconButton onClick={handleClickMenu} sx={{ color: "#9e9e9e" }}>
          <DragHandleIcon />
        </IconButton>
      ) : undefined}
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          xs: 0.5,
          sm: 1,
          gap: 2,
          width: 170,
        }}
      >
        <FavouriteHeader />
        <BasketHeader />
        <UserHeader />
      </Stack>
    </StyledToolbar>
  );
};

export default Header;
