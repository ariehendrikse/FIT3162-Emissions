import { Box, Button, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from "@material-ui/core"
import { Add } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { getMakesForYear } from "../../../epa/epa-data"
import { addInfrastructure, deleteInfrastructure, infrastructureListener } from "../../../firebase/infrastructure"
import {deleteVehicle, vehiclesListener} from "../../../firebase/vehicle";
import Infrastructure from "../../../model/Infrastructure"
import Vehicle from "../../../model/Vehicle"
import CustomFormProps from "../site-wide/collections/CustomFormProps"
import SelectedListItem from "../site-wide/collections/CustomList"
import { SelectListItemProps, ViewItemProps } from "../site-wide/collections/ItemCollection"
import { ItemDashboard } from "../site-wide/collections/ItemDashboard"
import Field from "../site-wide/Field"
import InfrastructureListItem from "./InfrastrucutreListItem"
import MapWithMarker from "../site-wide/mapbox/MapWithMarker"
import InfrastructureMarker from "./InfrastructureMarker"
import SelectHasCoordinates from "../site-wide/mapbox/SelectHasCoordinates"
import DeleteButton from "../site-wide/DeleteButton"



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
      <Box  sx={{ flexGrow: 1 }}>
        <Grid spacing={1} container style={style} alignItems='center'>
          <Grid item xs={12}>
            <Field  required label='Name' value={newInfrastructure?.name} setValue={name => setNewInfrastructure({...newInfrastructure as Infrastructure, name})}/>
          </Grid>
           
          <Grid item xs={12}>
            <Button fullWidth style={{color: 'white', backgroundColor:'green'}} type='submit' >Save</Button>
          </Grid>
          {
            !download ? 
            <Grid item xs={12}>
              <DeleteButton deleteAction={deleteInfrastructure(item)}/>
            </Grid> :
            undefined
          }
        </Grid>
      </Box>
    </form>
  )
}

export default InfrastructureForm