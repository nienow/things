import * as React from 'react';
import { useState } from 'react';
import './admin-main.css';
import { CreateCategory } from './create-category';
import {
	Route,
	useParams
} from 'react-router-dom';
import { CategoryList } from './category-list';
import { LevelLists } from './level-lists';
import { loadCollection } from '../db/thing-db';

export const AdminCollectionPage = () => {
	const [hasCollection, setHasCollection] = useState(false);
	const {collection} = useParams();
	loadCollection(collection).then(() => setHasCollection(true));

	if (hasCollection) {
		return <div className="collection">
			<Route exact path="/admin/:collection" component={CategoryList}/>
			<Route path="/admin/:collection/create" component={CreateCategory}/>
			<Route path="/admin/:collection/category/:categoryName" component={LevelLists}/>
		</div>;
	} else {
		return <div>Loading Collection...</div>
	}
};
