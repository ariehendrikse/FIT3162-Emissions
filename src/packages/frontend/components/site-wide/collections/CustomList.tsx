import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton';
import { SelectListItemProps } from './ItemCollection';


export type ListCustomItemsProps<T> = {
  items: JSX.Element[],
  onSelect: (index: number) => any,
}

export default function ListCustomItems<T>(props: ListCustomItemsProps<T>) {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const {items, onSelect} = props
  const handleListItemClick = (index: number) =>
  (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setSelectedIndex(index);
    onSelect(index)
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
      <List style={{maxHeight: 'calc(100vh - 150px)', overflow: 'auto'}} component='nav'  aria-label="main mailbox folders" >
        {items.map((item , i) => 
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedIndex === i}
            onClick={handleListItemClick(i)}
          >
            {item}
          </ListItemButton>
        </ListItem>

        )}
      </List>
    </Box>
  );
}