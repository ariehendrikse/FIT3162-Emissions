import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import Foundation from '@mui/icons-material/Foundation';
import { Box, Grid, Typography } from '@mui/material';
import Vehicle from '../../../model/Vehicle';
import { SelectListItemProps } from '../site/collections/ItemCollection';
import infrastructure from '../../../model/Infrastructure';


const InfrastrucutreListItem  = (props: SelectListItemProps<infrastructure>) => {
  const infrastructure = props.item
  return (
    <Grid container>
      <Grid item xs={10}>
        <Typography>
          {infrastructure.name}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <ListItemIcon>
          <Foundation />
        </ListItemIcon>
      </Grid>
      
    </Grid>
  )
}


export default InfrastrucutreListItem