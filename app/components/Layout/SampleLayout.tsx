import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';

import { SampleHeader } from './SampleHeader';
import { SampleSidebar } from './SampleSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export function SampleLayout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SampleHeader onMenuClick={handleMenuClick} />
      <SampleSidebar open={sidebarOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          minWidth: 0,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
