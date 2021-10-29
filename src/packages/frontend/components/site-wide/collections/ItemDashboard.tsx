import { Box, Grid, ListItem, ListItemIcon, ListItemText, Paper } from "@material-ui/core"
import { Add } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { Listener } from "../../../../firebase/Listener"
import ListCustomItems from "./CustomList"
import { SelectListItemProps, ViewItemProps } from "./ItemCollection"


type ItemDashboardProps<T> = {
  // used for listening to objects and their changes
  listenerFunction:  Listener<T>,
  // component for listing and selecting and item
  SelectItem: (props: SelectListItemProps<T>) => JSX.Element,
  // Component for adding anew item to the firestore
  AddItem: () => JSX.Element,
  // Component for viewing the item
  ViewItem: (props: ViewItemProps<T>) => JSX.Element,
}

export function ItemDashboard<T>(props: ItemDashboardProps<T>): JSX.Element {
  const [items, setItems] = useState<T[]>([])
  const [itemIndex, setItemIndex] = useState(0)
  const {listenerFunction, SelectItem, AddItem, ViewItem} = props
  // listen for items from firestore, then change state when changes on firestore made (deleting, updtaign, inserting)
  useEffect(() => {
    let listener = listenerFunction(vals => {
      setItems(vals)
    })
    return listener
  }, [])
  return (
    <Box m={3}>
      <Paper>
        <Box m={1}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <ListCustomItems 
                items={
                  [<AddButton />, ...items.map(v => <SelectItem item={v}/>)]
                  }
                onSelect={setItemIndex}
              />
            </Grid>
            <Grid item xs={9}>
              { itemIndex === 0 ?
                <AddItem /> :

                <ViewItem item={items[itemIndex - 1]} />
              }
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  )
}

const AddButton = () => {
  return (
    <ListItem style={{padding: 0, margin: 0 , borderRadius: 4, border: 'solid green 1px'}}>
      <ListItemIcon>
        <Add />
      </ListItemIcon>
      <ListItemText primary={'Add'} />
    </ListItem>
  )
}