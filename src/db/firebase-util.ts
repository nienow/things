import * as firebase from 'firebase/app';
// Required for side-effects
import 'firebase/auth';
import 'firebase/firestore';

const fireConfig = require('../fireConfig.json');

firebase.initializeApp(fireConfig);

export function getStore() {
	return firebase.firestore();
};

export function getAuth() {
	return firebase.auth();
};

export function signIn() {
	var provider = new firebase.auth.GoogleAuthProvider();
	return firebase.auth().signInWithPopup(provider);
};


