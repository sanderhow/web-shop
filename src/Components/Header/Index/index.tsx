import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Badge, BadgeProps } from '@mui/material';
// utils
// components
// import Iconify from '../../iconify';
import Searchbar from '../Searchbar/Searchbar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import BasketHeader from '../BasketHeader/BasketHeader';
import LoginModal from '../../Login/Modal/LoginModal';
import FavouriteHeader from '../FavouriteHeader/FavouriteHeader';
import UserHeader from '../User/UserHeader';

//
// import Searchbar from './Searchbar';
// import AccountPopover from './AccountPopover';
// import LanguagePopover from './LanguagePopover';
// import NotificationsPopover from './NotificationsPopover';

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

const Header: React.FC<IHeaderNavProps> = ( {handleClickMenu }) => {

  return (
    // <StyledRoot>
      <StyledToolbar>
        <IconButton onClick={handleClickMenu}
        
          // onClick={ //onOpenNav// 
          // }
          sx={{
            // ml: 1,
            color: '#9e9e9e',
            // display: { lg: 'none' },
          }}
        >
          <DragHandleIcon/>
          {/* <Iconify icon="eva:menu-2-fill" /> */}
        </IconButton>

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

         <Stack
          direction="row"
          alignItems="center"
          sx={{
            xs: 0.5,
            sm: 1,
            // mr: 10,
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