import Vehicle from "../model/Vehicle";
import { db } from "./firebase";

export const addVehicle = (vehicle?: Vehicle) => {
  if (vehicle) {
    db.collection('vehicles').doc(vehicle.vin).set(vehicle)

  }
}

export const vehiclesListener = (resolve: (vehicles: Vehicle[]) => any) => {
  return db.collection('vehicles').onSnapshot(snapshot => {
    resolve(snapshot.docs.map( doc => {
      return (doc.data() as Vehicle)
    }))
  })
}