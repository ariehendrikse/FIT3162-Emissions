
import vehiclesListener from "../../../firebase/vehicle"
import Vehicle from "../../../model/Vehicle"
import { AddVehicle } from "./AddVehicle"
import { InfrastructureMarker } from "../infrastructure/MapWithMarker"
import SelectHasCoordinates from "../infrastructure/SelectInfrastructure"
import SelectInfrastructure from "../infrastructure/SelectInfrastructure"
import SelectedListItem from "../site-wide/collections/CustomList"
import { SelectListItemProps, ViewItemProps } from "../site-wide/collections/ItemCollection"
import { ItemDashboard } from "../site-wide/collections/ItemDashboard"
import { FindVehicle } from "./FindVehicle"
import VehicleEpaData from "./VehicleEpaData"
import VechicleListItem from "./VehicleListItem"
import ViewVehicle from "./ViewVehicle"


// using generic types here to change between vehicles, trips, infrastruture.
// Easy building blocks for less code needed to be written.


export const FleetDashboard = () => (
  <ItemDashboard<Vehicle> ViewItem={ViewVehicle} listenerFunction={vehiclesListener} SelectItem={VechicleListItem} AddItem={AddVehicle}/>
)
