
import { Grid, Paper } from "@material-ui/core"

import Vehicle from "../../../model/Vehicle"

import SelectInfrastructure from "../infrastructure/SelectInfrastructure"

import VehicleEpaData from "./VehicleEpaData"

const ViewVehicle = (props: {item: Vehicle}) => {
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

export default ViewVehicle