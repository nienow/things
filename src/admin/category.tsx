import * as React from 'react';
import { useState } from 'react';
import './category.css';
import { useHistory } from 'react-router-dom';
import { thingDB } from '../db/thing-db';
import { CreateThing } from './create-thing';
import { ThingItem } from '../data-model';

interface CategoryProps {
	category: string;
}

export const ThingCategory = (props: CategoryProps) => {
	const history = useHistory();
	const [things, setThings] = useState(thingDB.getByCategory(props.category) || []);

	function goToCategory() {
		history.push(`/admin/category/${props.category}`);
	}

	function getThingPrintout() {
		return things.map((item) => {
			return item.title;
		}).join(', ');
	}

	function handleAdd(newThing: ThingItem) {
		things.push(newThing);
		setThings([...things]);
	}

	return (<div className="category">
		<button className="category__name" onClick={goToCategory}>{props.category}</button>
		<div className="category__new">
			<CreateThing category={props.category} onAdd={handleAdd}></CreateThing>
		</div>
		<div className="category__total">({things.length})</div>
		<div className="category__printout">{getThingPrintout()}</div>
	</div>);
};
