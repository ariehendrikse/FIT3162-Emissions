import { Box, Grid, Paper } from "@material-ui/core"
import { useState } from "react"
import HasCoordinates from "../../../model/HasCoordinates"
import Infrastructure from "../../../model/Infrastructure"

import Vehicle from "../../../model/Vehicle"
import SelectInfrastructure from "../infrastructure/SelectInfrastructure"
import { FindVehicle } from "./FindVehicle"
import VehicleEpaData from "./VehicleEpaData"



export const AddVehicle = () => {
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined)
  const setVehicleLocation = (item?: HasCoordinates) => {
    try {
      let infrastructure = item as Infrastructure
      setVehicle({...vehicle, coordinates: infrastructure?.coordinates, infrastructureID: infrastructure.id} as Vehicle)

    }
    catch {
      setVehicle({...vehicle, coordinates: item?.coordinates, infrastructureID: undefined} as Vehicle)
    }
    console.log(vehicle)
  }

  const setVehicleSpecs = (newVehicle?: Vehicle) => {
    setVehicle({...newVehicle, coordinates: vehicle?.coordinates, infrastructureID: vehicle?.id} as Vehicle)

  }

  return (
    <Paper>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <FindVehicle set={setVehicleSpecs}/>
          </Grid>
          <Grid item xs={5}>
            <VehicleEpaData download item={vehicle}/>
          </Grid>
          <Grid item xs={4}>
            <SelectInfrastructure showMap callback={setVehicleLocation}/>
          </Grid>
        </Grid>
      </Box>
    </Paper>
    
  ) 
}
