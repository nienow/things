import * as React from 'react';
import { useState } from 'react';
import './admin-main.css';
import { User } from 'firebase';
import { Route } from 'react-router-dom';
import {
	getAuth,
	signIn
} from '../db/firebase-util';
import { NoCollection } from './no-collection';
import { AdminCollectionPage } from './admin-collection';

export const AdminMain = () => {
	const [isAuthenticated, setAuthenticated] = useState(false);

	getAuth().onAuthStateChanged((user: User) => {
		setAuthenticated(user != null);
	});

	if (isAuthenticated) {
		return <div className="main">
			<Route exact path="/admin" component={NoCollection}/>
			<Route path="/admin/:collection" component={AdminCollectionPage}/>
		</div>;
	} else {
		return <button onClick={signIn}>Sign In</button>;
	}
};
