//1.
import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase";
import { getSuggestedQuery } from "@testing-library/react";
import { DBContext } from "./AuthProvider copy";
import { app } from "../../../firebase/firebase";
// undefined means authentication is loading, null means no user.
type InternalUser = (firebase.User & {admin?: boolean}) | null | undefined
//2.
export const AuthContext = createContext<InternalUser>(null)

//3.
//Provider for authenitcation throughtout the app
export const AuthProvider = (props: { children: React.ReactNode }) => {
  const [user, setUser] = useState<InternalUser>(undefined);
  const {children} = props
  const db = useContext(DBContext)

  const getUser = async (u: firebase.User | null) => {
    if (u) {
      let userDoc = await db.collection('users').doc(u.uid).get()
      let userData = userDoc.data()
      console.log("User data ", userData)

      if (userData?.company) {
        let companyData = await db.collection('companies').doc(userData.company).collection('users').doc(u.uid).get()
        console.log("User data ", companyData.data())

        if (companyData?.data()?.admin) {
          console.log("Admin")
          return true
        }
      }
}
    return false
  }

  useEffect(() => {
    app.auth().onAuthStateChanged(async u => {
      const admin = await getUser(u)
      console.log("admin", admin)
      setUser(u ? {...u, admin} : null)
    })
  }, []);



  return (
    <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
  );
};
