import { alpha, Avatar, Box, Button, Drawer, Link, Stack, styled, Typography } from '@mui/material';
import React from 'react';
import { useUser } from '../../Contexts/Auth/UserData';
import NavSection from '../Nav-section/NavSection';
import * as P from "./parts";

const StyledAccount = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha(theme.palette.grey[500], 0.12),
  }));
const NAV_WIDTH = 280;
const navConfig = [
    {
      title: 'Main page',
      path: '/',
    //   icon: icon('ic_analytics'),
    },
    {
      title: 'Favourites',
      path: '/favourites',
    //   icon: icon('ic_user'),
    },
    {
      title: 'Basket',
      path: '/basket',
    //   icon: icon('ic_cart'),
    },
    {
      title: 'Product',
      path: '/product',
    //   icon: icon('ic_blog'),
    },
    {
      title: 'Listing',
      path: '/listing',
    //   icon: icon('ic_lock'),
    },
    {
      title: 'Checkout',
      path: '/checkout',
    //   icon: icon('ic_disabled'),
    },
  ];

  function stringToColor(string: string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  interface INavbarProps {
    isMenuClicked: boolean;
    setIsMenuClicked: (a: boolean) => void;
  }


const Navbar: React.FC<INavbarProps> = ({ isMenuClicked, setIsMenuClicked }) => {
  const { userItems } = useUser();
  const isMobile = window.innerWidth < 1000;
  const renderContent = (
        <div
        //   sx={{
        //     height: 1,
        //     '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
        //   }}
        >
          <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
            {/* <Logo /> */}
          </Box>
    
          <Box sx={{ mb: 5, mx: 2.5 }}>
            <Link underline="none">
              <StyledAccount>
                {userItems ?
                  <Avatar {...stringAvatar(`John Doe`)} />
                :
                <Avatar sx={{
                  alt: "photoURL",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}/>
                }
                
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: 'text.#3f51b5', fontWeight: 'bold' }}>
                    {userItems?.name.firstname.toUpperCase()}
                  </Typography>
    
                  <Typography variant="body2" sx={{ color: 'text.#3f51b5', fontWeight: 'bold' }}>
                    {userItems?.name.lastname.toUpperCase()}
                  </Typography>
                </Box>
              </StyledAccount>
            </Link>
          </Box>
    
          <NavSection data={navConfig} />
    
          <Box sx={{ flexGrow: 1 }} />
    
          <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
            <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
              <Box
                component="img"
                src="/assets/illustrations/illustration_avatar.png"
                sx={{ width: 100, position: 'absolute', top: -50 }}
              />
            </Stack>
          </Box>
        </div>
      );
      console.log(isMenuClicked);
    return (
      <P.Wrapper>
        {isMobile ? 
          <Drawer
          open={isMenuClicked}
          variant="temporary"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
          onClose={() => setIsMenuClicked(false)}
          >
          {renderContent}
        </Drawer> :
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
          >
          {renderContent}
        </Drawer>
      }
      </P.Wrapper>
    );
}
  
export default Navbar;
