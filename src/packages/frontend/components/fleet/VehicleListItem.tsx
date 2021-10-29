import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import CarRentalIcon from '@mui/icons-material/CarRental';
import { Box } from '@mui/material';
import Vehicle from '../../../model/Vehicle';
import { SelectListItemProps } from '../site-wide/collections/ItemCollection';
import { ListItem } from '@material-ui/core';
import { DirectionsCar } from '@material-ui/icons';


const VechicleListItem  = (props: SelectListItemProps<Vehicle>) => {
  const vehicle = props.item
  return (
    <ListItem>
      <ListItemIcon>
        <DirectionsCar />
      </ListItemIcon>
      <ListItemText secondary={`VIN: ${vehicle.vin}`} primary={`${vehicle.make} ${vehicle.model}`} />
    </ListItem>
  )
}


export default VechicleListItem