import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import type { Item } from '../types';

interface ItemCardProps {
  item: Item;
  handleClick: () => void;
}

export function ItemCard({ item, handleClick }: ItemCardProps) {
  return (
    <Card 
      sx={{ 
        height: '100%',
        cursor: 'pointer',
        '&:hover': { 
          boxShadow: 4,
          transform: 'translateY(-2px)',
          transition: 'all 0.2s ease-in-out'
        }
      }}
      onClick={handleClick}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
            {item.name.charAt(0)}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="h2" sx={{ lineHeight: 1.2 }}>
              {item.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ID: {item.id}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {item.description}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6" color="primary" component="span" sx={{ mr: 1 }}>
              ¥{item.price.toLocaleString()}
            </Typography>
          </Box>
          <Chip
            label={item.status === 'on_sale' ? '販売中' : '売り切れ'}
            color={item.status === 'on_sale' ? 'success' : 'default'}
            size="small"
            variant="outlined"
          />
        </Box>
      </CardContent>
    </Card>
  );
}
