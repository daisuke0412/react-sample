import { Link as RouterLink } from "react-router";
import { Card, CardActionArea, CardContent, Typography, Grid, Container } from "@mui/material";
import InventoryIcon from '@mui/icons-material/Inventory';
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function TopPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea 
              component={RouterLink} 
              to="/items" 
              sx={{ height: '100%', p: 2 }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <InventoryIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  商品一覧
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea 
              component={RouterLink} 
              to="/items/new" 
              sx={{ height: '100%', p: 2 }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <AddBoxIcon sx={{ fontSize: 60, color: "secondary.main", mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  商品作成
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}