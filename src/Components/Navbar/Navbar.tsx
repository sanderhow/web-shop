import { alpha, Avatar, Box, Button, Drawer, Link, Stack, styled, Typography } from '@mui/material';
import React from 'react';
import NavSection from '../Nav-section';
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

const Navbar: React.FC = () => {
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
                <Avatar 
                // src={account.photoURL}
                 alt="photoURL" />
    
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                    {/* {account.displayName} */}
                    hjjkkkk
                  </Typography>
    
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {/* {account.role} */}
                    hjjkjj
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
    return (
      <P.Wrapper>
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
      </P.Wrapper>
    );
}
  
export default Navbar;
