import Vehicle from "../model/Vehicle";
import { db } from "./firebase";
import { Listener } from "./Listener";

const collection = db.collection('vehicles')
db.collection('vehicles')

export const addVehicle = (vehicle?: Vehicle) => {
  if (vehicle) {
    collection.doc(vehicle.vin).set(vehicle)

  }
}
export const deleteVehicle = (vehicle?: Vehicle) => () => {
  if (vehicle) {
    collection.doc(vehicle.id).delete()
  }
}
export const vehiclesListener: Listener<Vehicle> = (resolve: (vehicles: Vehicle[]) => any) => {
  return collection.onSnapshot(snapshot => {
    resolve(snapshot.docs.map( doc => {
      return ({...doc.data(), id: doc.id} as Vehicle)
    }))
  })
}
export default vehiclesListener;
