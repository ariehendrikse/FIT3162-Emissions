import { db } from "./firebase";
import { Listener } from "./Listener";
import Infrastructure from "../model/Infrastructure";

const collection = db.collection('infrastructure')

export const addInfrastructure = (infrustrcuture?: Infrastructure) => {
  if (infrustrcuture) {
    if (!infrustrcuture.id) {
      collection.add(infrustrcuture)
    }
    else {
      collection.doc(infrustrcuture.id).set(infrustrcuture)
    }
  }
}
export const deleteInfrastructure = (infrastructure?: Infrastructure) => () => {
  if (infrastructure) {
    collection.doc(infrastructure.id).delete()
  }
}
//listen for all infrastructure changes
export const infrastructureListener: Listener<Infrastructure> = (resolve: (infrastructure: Infrastructure[]) => any) => {
  return collection.onSnapshot(snapshot => {
    resolve(snapshot.docs.map(doc => {
      const data = doc.data();
      return ({ ...data, id: doc.id }) as Infrastructure;
    }));
  });
}