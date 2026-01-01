import { ErrorOutline, Home } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { useRouteError, Link } from "react-router";

export function AppErrorBoundary() {
  const error = useRouteError();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          gap: 3,
        }}
      >
        <ErrorOutline sx={{ fontSize: 80, color: 'error.main' }} />

        <Typography variant="h4" component="h1" gutterBottom>
          エラーが発生しました
        </Typography>

        <Typography variant="body1" color="text.secondary">
          {error instanceof Error ? error.message : String(error)}
        </Typography>

        <Button variant="contained" startIcon={<Home />} component={Link} to="/" size="large">
          ホームに戻る
        </Button>
      </Box>
    </Container>
  );
}