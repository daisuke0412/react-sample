import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState, type JSX } from "react";
import { LoginModal } from "~/features/auth/components/LoginModal";
import { useAuth } from "~/features/auth/hooks/useAuth";
import { useUserStore } from "~/stores/user-store";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function SampleHeader({ onMenuClick }: HeaderProps): JSX.Element {
  const user = useUserStore((state) => state.user);
  const { onLogout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogoutClick = () => {
    onLogout();
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
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

          {user ? (
            <>
              <Typography variant="body1" sx={{ mr: 2 }}>
                {user.userName} さん
              </Typography>
              <Button color="inherit" onClick={handleLogoutClick}>
                ログアウト
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleLoginClick}>
              ログイン
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <LoginModal
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
