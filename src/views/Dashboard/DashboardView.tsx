import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useTheme } from '../../store/themeContext';

const TrendingNowComponent = () => (
  <Paper
    sx={{
      borderRadius: '16px',
      borderColor: 'tertiary.main',
      borderWidth: '2px',
      borderStyle: 'solid',
      height: '30vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Typography variant="h6">Trending Now Component</Typography>
  </Paper>
);

const FollowingComponent = () => (
    <Paper
    sx={{
      borderRadius: '16px',
      borderColor: 'tertiary.main',
      borderWidth: '2px',
      borderStyle: 'solid',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Typography variant="h6">FollowingComponent</Typography>
  </Paper>
);

const FavoritesComponent = () => (
    <Paper
    sx={{
      borderRadius: '16px',
      borderColor: 'tertiary.main',
      borderWidth: '2px',
      borderStyle: 'solid',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Typography variant="h6">FavoritesComponent</Typography>
  </Paper>
);

const CarouselCryptoComponent = () => (
    <Paper
    sx={{
      borderRadius: '16px',
      borderColor: 'tertiary.main',
      borderWidth: '2px',
      borderStyle: 'solid',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Typography variant="h6">CarouselCryptoComponent</Typography>
  </Paper>
);


const DashboardView: React.FC = () => {
    const theme = useTheme();
    return (
      <Box sx={{ flexGrow: 1, padding:2, bgcolor: theme.background }}>
        <Grid container spacing={(2)}>
          {/* Top row components */}
          <Grid item xs={12} sm={4}>
            <TrendingNowComponent />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FollowingComponent />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FavoritesComponent />
          </Grid>
          {/* Full-width bottom component */}
          <Grid item xs={12}>
            <Box sx={{ height: 'calc(100vh - 600px)' }}> {/* Assuming 200px is the combined height of the top components + spacing */}
              <CarouselCryptoComponent />
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  export default DashboardView;