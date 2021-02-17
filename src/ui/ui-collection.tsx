import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadCollection } from '../db/thing-db';
import { UiGame } from './ui-game';

export const UICollectionPage = () => {
	const [hasCollection, setHasCollection] = useState(false);
	const {collection} = useParams();
	loadCollection(collection).then(() => setHasCollection(true));

	if (hasCollection) {
		return <UiGame/>
	} else {
		return <div>Loading Collection...</div>
	}
};
