import Vehicle from "./Vehicle"

type Depot = {
  current_vehicles: Vehicle[];
  position:  {
    longitude: number;
    latitude: number;
  }
  name?: string;
  id: string;
}

export default Depot
