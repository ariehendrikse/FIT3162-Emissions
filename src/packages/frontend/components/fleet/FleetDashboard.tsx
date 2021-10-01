import { Box, Button, Grid, List, ListItem, ListItemIcon, ListItemText, Paper } from "@material-ui/core"
import { Add } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { getMakesForYear } from "../../../epa/epa-data"
import { infrastructureListener } from "../../../firebase/infrastructure"
import { vehiclesListener } from "../../../firebase/vehicle"
import Vehicle from "../../../model/Vehicle"
import { InfrastructureMarker } from "../infrastructure/MapWithMarker"
import SelectHasCoordinates from "../infrastructure/SelectInfrastructure"
import SelectInfrastructure from "../infrastructure/SelectInfrastructure"
import SelectedListItem from "../site/collections/CustomList"
import { SelectListItemProps, ViewItemProps } from "../site/collections/ItemCollection"
import { ItemDashboard } from "../site/collections/ItemDashboard"
import { FindVehicle } from "./FindVehicle"
import VehicleEpaData from "./VehicleEpaData"
import VechicleListItem from "./VehicleListItem"


// using generic types here to change between vehicles, trips, infrastruture.
// Easy building blocks for less code needed to be written.


export const FleetDashboard = () => (
  <ItemDashboard<Vehicle> ViewItem={ViewVehicle} listenerFunction={vehiclesListener} SelectItem={VechicleListItem} AddItem={AddVehicle}/>
)

export const AddVehicle = () => {
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined)

  return (
    <Paper>
      <Grid container>
        <Grid item xs={6}>
          <FindVehicle set={setVehicle}/>
        </Grid>
        <Grid item xs={6}>
          <VehicleEpaData download item={vehicle}/>
        </Grid>
        <Grid item xs={12}>
          <SelectInfrastructure />
        </Grid>
      </Grid>
    </Paper>
    
  ) 
}

export const ViewVehicle = (props: {item: Vehicle}) => {
  const {item} = props
  return ( 
    <Paper>
      <Grid container>
        <Grid item xs={6}>
          <div style={{height: 'calc(70vh - 150px)',margin: 20 }}>
            <SelectInfrastructure showMap callback={item => console.log(item?.coordinates, "From callback")}/>
          </div>
         </Grid>
        <Grid item xs={6}>
          <VehicleEpaData item={item}/>
        </Grid>
        
      </Grid>
    </Paper>)
}