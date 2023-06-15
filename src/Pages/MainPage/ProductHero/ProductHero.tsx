// import { Button, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../Components/Button/Button';
import ProductHeroLayout from '../../../Components/ProductHeroLayout/ProductHeroLayout';
import Typography from '../../../Components/Typography/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

const backgroundImage =
  'https://images.squarespace-cdn.com/content/v1/5a9316f3ec4eb7af0927c395/1623753550865-V46BDME5QXAROCT94RLP/Get+in+touch+to+book+a+shoot';

export default function ProductHero() {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:800px)');
    
        const goToListingPage = () => {
            navigate(`/listing`);
        }

  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      <Typography sx={{ fontWeight: 'bold' }}color="inherit" align="center" variant="h2">
        UPGRADE YOUR HOME SPACE
      </Typography>
      <Typography sx={{ fontWeight: 'bold', fontSize: 32, }}color="inherit" align="center" variant="h2" marked="center">
        for summer.
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        Enjoy summer offers up to -15% off.
      </Typography>
      <Button
        onClick={goToListingPage}
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        sx={{ minWidth: 200 }}
        >
        Check out our offer
      </Button>
    </ProductHeroLayout>
  );
}
