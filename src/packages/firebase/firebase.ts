// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDODr9kHDOdDmN-V4n32iJr99kB2PkWURg",
  authDomain: "fit3162-emissions.firebaseapp.com",
  projectId: "fit3162-emissions",
  storageBucket: "fit3162-emissions.appspot.com",
  messagingSenderId: "565419155474",
  appId: "1:565419155474:web:2fde0f9dbbd6d14e70f8cb",
  measurementId: "G-QNPG32L5DK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebase.app().firestore()