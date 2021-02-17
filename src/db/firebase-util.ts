import * as firebase from 'firebase/app';
// Required for side-effects
import 'firebase/auth';
import 'firebase/firestore';

const fireConfig = require('../fireConfig.json');

firebase.initializeApp(fireConfig);

const store = firebase.firestore();

if (window.location.hostname === "localhost") {
	console.log("localhost detected!");
	store.settings({
		host: "localhost:8020",
		ssl: false
	});
}

export function getStore() {
	return store;
};

export function getAuth() {
	return firebase.auth();
};

export function signIn() {
	var provider = new firebase.auth.GoogleAuthProvider();
	return firebase.auth().signInWithPopup(provider);
};


