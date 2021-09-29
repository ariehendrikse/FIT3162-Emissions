import Infrastrucure from "../model/Infrastructure";
import { db } from "./firebase";
const collection = db.collection('infrastructure')


export const addInfrastructure = (infrustrcuture?: Infrastrucure) => {
  if (infrustrcuture) {
    if (!infrustrcuture.id) {
      collection.add(infrustrcuture)
    }
    else {
      collection.doc(infrustrcuture.id).set(infrustrcuture)
    }
  }
}

export const infrastructureListener = (resolve: (infrastructure: Infrastrucure[]) => any) => {
  return collection.onSnapshot(snapshot => {
    resolve(snapshot.docs.map( doc => {
      const data = doc.data()
      return ({...data, id: doc.id}) as Infrastrucure
    }))
  })
}