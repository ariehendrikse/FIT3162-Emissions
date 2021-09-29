import { Box, Button, Grid, List, ListItem, ListItemIcon, ListItemText, Paper } from "@material-ui/core"
import { Add } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { getMakesForYear } from "../../../epa/epa-data"
import { addInfrastructure, infrastructureListener } from "../../../firebase/infrastructure"
import { vehiclesListener } from "../../../firebase/vehicle"
import Infrastructure from "../../../model/Infrastructure"
import Infrastrucure from "../../../model/Infrastructure"
import Vehicle from "../../../model/Vehicle"
import { Field } from "../fleet/VehicleEpaData"
import CustomFormProps from "../site/collections/CustomFormProps"
import SelectedListItem from "../site/collections/CustomList"
import { SelectListItemProps, ViewItemProps } from "../site/collections/ItemCollection"
import { ItemDashboard } from "../site/collections/ItemDashboard"
import InfrastructureListItem from "./InfrastrucutreListItem"


// using generic types here to change between vehicles, trips, infrastruture.
// Easy building blocks for less code needed to be written.


export const InfrastructureDashboard = () => (
  <ItemDashboard<Infrastrucure> ViewItem={ViewInfrastructure} listenerFunction={infrastructureListener} SelectItem={InfrastructureListItem} AddItem={AddInfrastructure}/>
)

export const AddInfrastructure = () => {
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined)

  return (
    <Paper>
      <Grid container>
        <Grid item xs={6}>
          Add find location here
        </Grid>
        <Grid item xs={6}>
          <InfrastructureForm />
        </Grid>
      </Grid>
    </Paper>
    
  ) 
}

export const ViewInfrastructure = (props: {item: Infrastrucure}) => {
  const {item} = props
  return ( 
    <Paper>
      <Grid container>
        <Grid item xs={6}>
          Viewing infrastructure {item.name}
        </Grid>
        <Grid item xs={6}>
          Add view location info here {item.coordinates}
        </Grid>
      </Grid>
    </Paper>)
}

const InfrastructureForm = (props: CustomFormProps<Infrastructure>) => {
  const {item, style, download} = props
  const [newInfrastructure, setNewInfrastructure] = useState<Infrastructure | undefined>(item)
  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    addInfrastructure(newInfrastructure)
  }
  useEffect(() => {
    
      setNewInfrastructure (item)
    
  }, [item])

  return (
    <form onSubmit={handleSubmit}>
      <Box m={2} sx={{ flexGrow: 1 }}>
        <Grid spacing={1} container style={style} alignItems='center'>
          <Grid item xs={12}>
            <Field required label='Name' value={newInfrastructure?.name} setValue={name => setNewInfrastructure({...newInfrastructure as Infrastructure, name})}/>
          </Grid>
          <Grid item xs={6}>
          <Field required type='number' label='Longitude' value={newInfrastructure?.coordinates?.lon} setValue={lon => setNewInfrastructure({...newInfrastructure as Infrastructure, coordinates: {...newInfrastructure?.coordinates, lon: parseInt(lon) as number}})}/>
          </Grid>
          <Grid item xs={6}>
            <Field required type='number' label='Latitude' value={newInfrastructure?.coordinates?.lat} setValue={lat => setNewInfrastructure({...newInfrastructure as Infrastructure, coordinates: {...newInfrastructure?.coordinates, lat: parseInt(lat) as number}})}/>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth style={{color: 'white', backgroundColor:'green'}} type='submit' >Save</Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  )
}