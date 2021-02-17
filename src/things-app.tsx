import * as React from 'react';
import { AdminMain } from './admin/admin-main';
import {
	BrowserRouter as Router,
	Redirect,
	Route
} from 'react-router-dom';
import { UiMain } from './ui/ui-main';

const ThingsApp = () => {
	return <Router>
		<Route exact path="/"><Redirect to="/ui" /></Route>
		<Route path="/ui" component={UiMain}/>
		<Route path="/admin" component={AdminMain}/>
	</Router>;
};

export default ThingsApp;
