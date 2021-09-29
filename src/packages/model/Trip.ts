import Depot from "./Depot"
import User from "./User"
import Vehicle from "./Vehicle"

type Trip = {
  id: string
  from: Depot
  to: Depot
  co2_grams: number
  distance: number
  vehicle: Vehicle
  driver: User
}

export default Trip