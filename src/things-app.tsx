import * as React from 'react';
import {
	useEffect,
	useState
} from 'react';
import { AdminMain } from './admin/admin-main';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import { UiMain } from './ui/ui-main';
import { whenThingsLoaded } from './thing-db';

const ThingsApp = () => {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		whenThingsLoaded().then(() => {
			setReady(true);
		});
	}, []);

	if (ready) {
		return <Router>
			<Route exact path="/" component={UiMain}/>
			<Route path="/admin" component={AdminMain}/>
		</Router>;
	} else {
		return <div></div>;
	}
};

export default ThingsApp;
