import { Button, List, ListItem } from "@material-ui/core"
import { useState } from "react"
import { getMakesForYear } from "../../../epa/epa-data"
import Vehicle from "../../../model/Vehicle"
import { FindVehicle } from "./FindVehicle"
import VehicleEpaData from "./VehicleEpaData"

const renderList = ((vals: String[]) => (
  <List>
    {vals.map((item) => (
      <ListItem>
        {item}
      </ListItem>
    ))}
  </List>
)) 
export const FleetDashboard = () => {
  
  return <AddVehicle />
  
}

export const AddVehicle = () => {
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined)

  return (
    <div>
      <FindVehicle set={setVehicle}/>
      <VehicleEpaData vehicle={vehicle}/>
    </div>
  ) 
}