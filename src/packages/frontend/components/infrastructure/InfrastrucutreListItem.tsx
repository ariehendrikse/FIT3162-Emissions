import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import CarRentalIcon from '@mui/icons-material/CarRental';
import { Box } from '@mui/material';
import Vehicle from '../../../model/Vehicle';
import { SelectListItemProps } from '../site/collections/ItemCollection';
import Infrastrucure from '../../../model/Infrastructure';


const InfrastrucutreListItem  = (props: SelectListItemProps<Infrastrucure>) => {
  const infrastructure = props.item
  return (
    <Box>
      <ListItemIcon>
        <CarRentalIcon />
      </ListItemIcon>
      <ListItemText primary={infrastructure.name} />
    </Box>
  )
}


export default InfrastrucutreListItem