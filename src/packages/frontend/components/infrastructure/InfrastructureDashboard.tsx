import { Box, Button, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from "@material-ui/core"
import { Add } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { getMakesForYear } from "../../../epa/epa-data"
import { addInfrastructure, infrastructureListener } from "../../../firebase/infrastructure"
import { vehiclesListener } from "../../../firebase/vehicle"
import Infrastructure from "../../../model/Infrastructure"
import Vehicle from "../../../model/Vehicle"
import CustomFormProps from "../site-wide/collections/CustomFormProps"
import SelectedListItem from "../site-wide/collections/CustomList"
import { SelectListItemProps, ViewItemProps } from "../site-wide/collections/ItemCollection"
import { ItemDashboard } from "../site-wide/collections/ItemDashboard"
import Field from "../site-wide/Field"
import InfrastructureListItem from "./InfrastrucutreListItem"
import MapWithMarker, { InfrastructureMarker } from "./MapWithMarker"


// using generic types here to change between vehicles, trips, infrastruture.
// Easy building blocks for less code needed to be written.


export const InfrastructureDashboard = () => (
  <ItemDashboard<Infrastructure> ViewItem={ViewInfrastructure} listenerFunction={infrastructureListener} SelectItem={InfrastructureListItem} AddItem={AddInfrastructure}/>
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

export const ViewInfrastructure = (props: {item: Infrastructure}) => {
  const {item} = props
  return ( 
    <Paper>
      <Grid container>
        <Grid item xs={12}>
          <Typography align='center' variant='h4' color='textSecondary'>
            {item.name}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <MapWithMarker MarkerElement={InfrastructureMarker} item={item}/>
        </Grid>
        <Grid item xs={6}>
         <InfrastructureForm item={item} />
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
            <Field  required label='Name' value={newInfrastructure?.name} setValue={name => setNewInfrastructure({...newInfrastructure as Infrastructure, name})}/>
          </Grid>
          <Grid item xs={6}>
          <Field  inputProps={{min: -180, max: 180,step: 'any'}} required type='number' label='Longitude' value={newInfrastructure?.coordinates?.lon} setValue={lon => setNewInfrastructure({...newInfrastructure as Infrastructure, coordinates: {...newInfrastructure?.coordinates, lon: parseFloat(lon) as number}})}/>
          </Grid>
          <Grid item xs={6}>
            <Field inputProps={{min: -90, max: 90,step: 'any'}} required type='number' label='Latitude' value={newInfrastructure?.coordinates?.lat} setValue={lat => setNewInfrastructure({...newInfrastructure as Infrastructure, coordinates: {...newInfrastructure?.coordinates, lat: parseFloat(lat) as number}})}/>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth style={{color: 'white', backgroundColor:'green'}} type='submit' >Save</Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  )
}