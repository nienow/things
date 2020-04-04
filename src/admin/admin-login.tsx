import * as React from 'react';
import {
	getAuth,
	signInToDB
} from '../firebase-util';
import {useState} from "react";
import {User} from "firebase";

export const AdminLogin = () => {
	const [isAuthenticated, setAuthenticated] = useState(true);

	getAuth().onAuthStateChanged((user: User) => {
		setAuthenticated(user != null);
	});

	let button;
	if (isAuthenticated) {
		button = <div/>;
	} else {
		button = <button onClick={signInToDB}>Sign In</button>;
	}

	return <div>{button}</div>;
};
