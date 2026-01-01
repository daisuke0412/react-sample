import Grid from '@mui/material/Grid';
import { ItemCard } from './ItemCard';
import type { Item } from '../types';

interface ItemListProps {
  items: Item[];
  onItemClick: (id: string) => () => void;
}

export function ItemList({ items, onItemClick }: ItemListProps) {
  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
          <ItemCard 
            item={item} 
            handleClick={onItemClick(item.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
