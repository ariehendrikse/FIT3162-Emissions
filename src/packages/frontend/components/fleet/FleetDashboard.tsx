import { Box, Button, Grid, List, ListItem, ListItemIcon, ListItemText, Paper } from "@material-ui/core"
import { Add } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { getMakesForYear } from "../../../epa/epa-data"
import { vehiclesListener } from "../../../firebase/vehicle"
import Vehicle from "../../../model/Vehicle"
import SelectedListItem from "../site/collections/CustomList"
import { SelectListItemProps, ViewItemProps } from "../site/collections/ItemCollection"
import { FindVehicle } from "./FindVehicle"
import VehicleEpaData from "./VehicleEpaData"
import VechicleListItem from "./VehicleListItem"


// using generic types here to change between vehicles, trips, infrastruture.
// Easy building blocks for less code needed to be written.
type ItemDashboardProps<T> = {
  listenerFunction:  (resolve: (items: T[]) => any) => () => void,
  SelectItem: (props: SelectListItemProps<T>) => JSX.Element,
  AddItem: () => JSX.Element,
  ViewItem: (props: ViewItemProps<T>) => JSX.Element,
}

export function ItemDashboard<T>(props: ItemDashboardProps<T>): JSX.Element {
  const [items, setItems] = useState<T[]>([])
  const [itemIndex, setItemIndex] = useState(-1)
  const {listenerFunction, SelectItem, AddItem, ViewItem} = props

  useEffect(() => {
    let listener = listenerFunction(vals => {
      setItems(vals)
    })
    return listener
  }, [])

  useEffect(()=>{
    console.log(itemIndex)
  }, [itemIndex])
  
  return (
    <Box m={1}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <SelectedListItem 
          items={
            [<AddButton />, ...items.map(v => <SelectItem item={v}/>)]
            }
          onSelect={setItemIndex}/>
        </Grid>
        <Grid item xs={10}>
          { itemIndex === 0 ?
            <AddItem /> :
            itemIndex === -1 ? 
            "Select or add an item"
            : <ViewItem item={items[itemIndex - 1]} />
          }
        </Grid>

      </Grid>
    </Box>

  )

}

const AddButton = () => {
  return (
    <Box>
      <ListItemIcon>
        <Add />
      </ListItemIcon>
      <ListItemText primary={'Add'} />
    </Box>
  )
}

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
          <VehicleEpaData download vehicle={vehicle}/>
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
          Viewing vehicle
        </Grid>
        <Grid item xs={6}>
          <VehicleEpaData vehicle={item}/>
        </Grid>
      </Grid>
    </Paper>)
}