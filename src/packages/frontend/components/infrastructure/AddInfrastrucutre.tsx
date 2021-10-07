import { Box, Button, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from "@material-ui/core"
import { Add } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { getMakesForYear } from "../../../epa/epa-data"
import { addInfrastructure, infrastructureListener } from "../../../firebase/infrastructure"
// import vehiclesListener from "../../../firebase/vehicle"
import Infrastructure from "../../../model/Infrastructure"
import Vehicle from "../../../model/Vehicle"
import CustomFormProps from "../site/collections/CustomFormProps"
import SelectedListItem from "../site/collections/CustomList"
import { SelectListItemProps, ViewItemProps } from "../site/collections/ItemCollection"
import { ItemDashboard } from "../site/collections/ItemDashboard"
import Field from "../site/Field"
import InfrastructureListItem from "./InfrastrucutreListItem"
import MapWithMarker from "../site/mapbox/MapWithMarker"
import InfrastructureMarker from "./InfrastructureMarker"
import InfrastructureForm from "./InfrastructureForm"
import SelectHasCoordinates from "../site/mapbox/SelectHasCoordinates"


export const AddInfrastructure = () => {
  const [infrastructure, setInfrastructure] = useState<Infrastructure | undefined>(undefined)

  return (
    <Paper>
      <Grid container style={{margin: 2}} spacing={2}>
        <Grid item xs={6}>
            <SelectHasCoordinates  
              showMap
              callback={
              item => setInfrastructure({...infrastructure, coordinates: item?.coordinates} as Infrastructure)
            }/>
        </Grid>
        <Grid item xs={6}>
          <InfrastructureForm item={infrastructure}/>
        </Grid>
      </Grid>
    </Paper>
    
  ) 
}

export const ViewInfrastructure = (props: {item: Infrastructure}) => {
  const {item} = props

  return ( 
    <Paper>
      <Grid container>
        
        <Grid item xs={6}>
          <MapWithMarker MarkerElement={InfrastructureMarker} item={item}/>
        </Grid>
        <Grid item xs={6}>
          <InfrastructureForm item={item} />
        </Grid>
      </Grid>
    </Paper>)
}
