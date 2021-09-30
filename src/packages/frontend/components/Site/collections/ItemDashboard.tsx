import { Box, Grid, ListItemIcon, ListItemText, Paper } from "@material-ui/core"
import { Add } from "@material-ui/icons"
import { useEffect, useState } from "react"
import ListCustomItems from "./CustomList"
import { SelectListItemProps, ViewItemProps } from "./ItemCollection"


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
    <Box m={3}>
      <Paper>
        <Box m={1}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <ListCustomItems 
                items={
                  [<AddButton />, ...items.map(v => <SelectItem item={v}/>)]
                  }
                onSelect={setItemIndex}
              />
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
      </Paper>
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