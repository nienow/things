import * as React from 'react';
import { useState } from 'react';
import './admin-main.css';
import { CreateCategory } from './create-category';
import { User } from 'firebase';
import { Route } from 'react-router-dom';
import { CategoryList } from './category-list';
import { LevelLists } from './level-lists';
import {
	getAuth,
	signIn
} from '../db/firebase-util';

export const AdminMain = () => {
	const [isAuthenticated, setAuthenticated] = useState(false);

	getAuth().onAuthStateChanged((user: User) => {
		setAuthenticated(user != null);
	});

	if (isAuthenticated) {
		return <div className="main">
			<Route exact path="/admin" component={CategoryList}/>
			<Route path="/admin/create" component={CreateCategory}/>
			<Route path="/admin/category/:categoryName" component={LevelLists}/>
		</div>;
	} else {
		return <button onClick={signIn}>Sign In</button>;
	}
};
