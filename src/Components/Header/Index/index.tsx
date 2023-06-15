import { styled } from '@mui/material/styles';
import { Box, Stack, Toolbar, IconButton } from '@mui/material';
import Searchbar from '../Searchbar/Searchbar';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import BasketHeader from '../BasketHeader/BasketHeader';
import FavouriteHeader from '../FavouriteHeader/FavouriteHeader';
import UserHeader from '../User/UserHeader';
import useMediaQuery from '@mui/material/useMediaQuery';
// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

interface IHeaderNavProps {
  handleClickMenu: () => void,
  // onOpenNav: PropTypes.func,
}

const Header: React.FC<IHeaderNavProps> = ({handleClickMenu }) => {

  const isMobileScreen = useMediaQuery('(max-width:800px)');

  return (
    // <StyledRoot>
      <StyledToolbar>
        {isMobileScreen ?
        <IconButton onClick={handleClickMenu}
        
        // onClick={ //onOpenNav// 
        // }
        sx={{ color: '#9e9e9e' }}>
          <DragHandleIcon/>
        </IconButton> :
        undefined
        }
        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

         <Stack
          direction="row"
          alignItems="center"
          sx={{
            xs: 0.5,
            sm: 1,
            gap: 2,
          }}
        >
          <FavouriteHeader/>
          <BasketHeader/>
          <UserHeader/>
        </Stack> 
      </StyledToolbar>
  );
}

export default Header;