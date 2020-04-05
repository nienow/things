import * as React from 'react';
import { AdminMain } from './admin/admin-main';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import { UiMain } from './ui/ui-main';

const ThingsApp = () => {
	return <Router>
		<Route exact path="/" component={UiMain}/>
		<Route path="/admin" component={AdminMain}/>
	</Router>;
};

export default ThingsApp;
