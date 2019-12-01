import * as firebase from "firebase/app";
// Required for side-effects
import "firebase/auth";
import "firebase/firestore";
const fireConfig = require("../fireConfig.json");

firebase.initializeApp(fireConfig);

const fireDB = firebase.firestore();

export const getDB = () => {
  return fireDB;
};

export const signInToDB = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const isSignedIn = () => {
  return firebase.auth().currentUser != null;
};

export interface ThingItem {
  title: string;
  category: string;
  level?: number;
}
