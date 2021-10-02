import { Box, Grid, Paper } from "@material-ui/core"
import { useState } from "react"

import Vehicle from "../../../model/Vehicle"
import SelectInfrastructure from "../infrastructure/SelectInfrastructure"
import { FindVehicle } from "./FindVehicle"
import VehicleEpaData from "./VehicleEpaData"



export const AddVehicle = () => {
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined)

  return (
    <Paper>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <FindVehicle set={setVehicle}/>
          </Grid>
          <Grid item xs={5}>
            <VehicleEpaData download item={vehicle}/>
          </Grid>
          <Grid item xs={4}>
            <SelectInfrastructure showMap />
          </Grid>
        </Grid>
      </Box>
    </Paper>
    
  ) 
}
