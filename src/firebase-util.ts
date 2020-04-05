import * as firebase from 'firebase/app';
// Required for side-effects
import 'firebase/auth';
import 'firebase/firestore';
import { ThingItem } from './data-model';

const fireConfig = require('./fireConfig.json');

firebase.initializeApp(fireConfig);

const fireDB = firebase.firestore();

const thingsPromise: Promise<ThingItem[]> = fireDB
.collection('things')
.get()
.then((querySnapshot) => {
	const data: ThingItem[] = [];
	querySnapshot.forEach((doc) => {
		data.push({
			id: doc.id, ...doc.data()
		} as ThingItem);
	});
	return data;
});

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

export const getThings = (): Promise<ThingItem[]> => {
	return thingsPromise;
};


