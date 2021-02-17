import * as React from 'react';
import { Route } from 'react-router-dom';
import { UICollectionPage } from './ui-collection';
import { UINoCollection } from './no-collection';

export const UiMain = () => {
	return <div className="main">
		<Route exact path="/ui" component={UINoCollection}/>
		<Route path="/ui/:collection" component={UICollectionPage}/>
	</div>;
};
