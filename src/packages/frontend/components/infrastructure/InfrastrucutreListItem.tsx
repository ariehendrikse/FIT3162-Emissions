import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import Foundation from '@mui/icons-material/Foundation';
import { Box, Grid, Typography } from '@mui/material';
import Vehicle from '../../../model/Vehicle';
import { SelectListItemProps } from '../site-wide/collections/ItemCollection';
import Infrastructure from '../../../model/Infrastructure';


const InfrastrucutreListItem  = (props: SelectListItemProps<Infrastructure>) => {
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