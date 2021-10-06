import { Box, Button, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from "@material-ui/core"
import { Add } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { getMakesForYear } from "../../../epa/epa-data"
import { addInfrastructure, infrastructureListener } from "../../../firebase/infrastructure"
import vehiclesListener from "../../../firebase/vehicle"
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
import SelectHasCoordinates from "../site/mapbox/SelectHasCoordinates"



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
        </Grid>
      </Box>
    </form>
  )
}

export default InfrastructureForm