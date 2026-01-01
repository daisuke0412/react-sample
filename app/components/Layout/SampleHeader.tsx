import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { type JSX } from 'react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function SampleHeader({ onMenuClick }: HeaderProps): JSX.Element {
  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            React Demo アプリ
          </Typography>

        </Toolbar>
      </AppBar>
    </>
  );
}
