import * as React from 'react';
import {
	FormEvent,
	useState
} from 'react';
import { thingDB } from '../db/thing-db';
import { ThingItem } from '../data-model';

interface ThingNameFieldProps {
	category: string;
	onAdd: (newThing: ThingItem) => void;
}

export function CreateThing(props: ThingNameFieldProps) {
	const [title, setTitle] = useState('');

	function handleTitleChange(event: FormEvent) {
		const target: HTMLInputElement = event.target as HTMLInputElement;
		setTitle(target.value);
	}

	function handleSubmit(event: FormEvent) {
		event.preventDefault();
		thingDB.add({
			title,
			category: props.category
		})
		.then((newThing: ThingItem) => props.onAdd(newThing));
	};

	return <form onSubmit={handleSubmit}>
		<input className="create-thing__input" placeholder={'New ' + props.category + '...'} onChange={handleTitleChange}
			   value={title}/>
	</form>;
}
