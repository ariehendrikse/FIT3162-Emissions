
import vehiclesListener from "../../../firebase/vehicle"
import Vehicle from "../../../model/Vehicle"
import { ItemDashboard } from "../site/collections/ItemDashboard"
import { AddVehicle } from "./AddVehicle"
import VechicleListItem from "./VehicleListItem"
import ViewVehicle from "./ViewVehicle"


// using generic types here to change between vehicles, trips, infrastruture.
// Easy building blocks for less code needed to be written.


export const FleetDashboard = () => (
  <ItemDashboard<Vehicle> ViewItem={ViewVehicle} listenerFunction={vehiclesListener} SelectItem={VechicleListItem} AddItem={AddVehicle}/>
)
