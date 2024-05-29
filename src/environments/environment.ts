// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAulXmqlQSZSolQerrAPAUD42PXvgXUdtQ",
  authDomain: "skullvies.firebaseapp.com",
  databaseURL: "https://skullvies-default-rtdb.firebaseio.com",
  projectId: "skullvies",
  storageBucket: "skullvies.appspot.com",
  messagingSenderId: "14964010249",
  appId: "1:14964010249:web:36be275201f368603677d8",
  measurementId: "G-51M3LNNE97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const environment = {
  production: false,
  firebaseConfig: firebaseConfig
};
