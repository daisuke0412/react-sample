import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import type { JSX } from 'react';
import { useLoadingStore } from '~/stores/loading-store';

export const LoadingSpinner = (): JSX.Element | null => {
  const isLoading = useLoadingStore(s => s.isLoading);

  if (!isLoading) return null;

  return (
    <Backdrop
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        zIndex: 9999,
      }}
      open={isLoading}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <CircularProgress color="inherit" />
      </Box>
    </Backdrop>
  );
};