//1.
import React, { createContext, useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";
import firebase from "firebase";
import { getSuggestedQuery } from "@testing-library/react";
// undefined means authentication is loading, null means no user.
type InternalUser = (firebase.User & {admin?: boolean}) | null | undefined
//2.
export const DBContext = createContext<firebase.firestore.Firestore>(db)

//3.
//Provider for authenitcation throughtout the app
export const DBProvider = (props: { children: React.ReactNode }) => {
  const {children} = props
  return (
    <DBContext.Provider value={db} >{children}</DBContext.Provider>
  );
};
