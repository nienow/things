import * as firebase from 'firebase/app';
// Required for side-effects
import 'firebase/auth';
import 'firebase/firestore';

const fireConfig = require('./fireConfig.json');

firebase.initializeApp(fireConfig);

const fireDB = firebase.firestore();

export const getDB = () => {
	return fireDB;
};

export const getAuth = () => {
	return firebase.auth();
};

export const signInToDB = () => {
	var provider = new firebase.auth.GoogleAuthProvider();
	return firebase.auth().signInWithPopup(provider);
};


