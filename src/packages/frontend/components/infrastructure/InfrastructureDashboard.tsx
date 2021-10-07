import { Box, Button, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from "@material-ui/core"
import { Add } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { getMakesForYear } from "../../../epa/epa-data"
import { addInfrastructure, infrastructureListener } from "../../../firebase/infrastructure"
import vehiclesListener from "../../../firebase/vehicle"
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
import { AddInfrastructure, ViewInfrastructure } from "./AddInfrastrucutre"


// using generic types here to change between vehicles, trips, infrastruture.
// Easy building blocks for less code needed to be written.


export const InfrastructureDashboard = () => (
  <ItemDashboard<Infrastructure> ViewItem={ViewInfrastructure} listenerFunction={infrastructureListener} SelectItem={InfrastructureListItem} AddItem={AddInfrastructure}/>
)
