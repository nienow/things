import * as React from 'react';
import {
	FormEvent,
	useState
} from 'react';
import { thingDB } from '../db/thing-db';
import { ThingItem } from '../data-model';

interface ThingNameFieldProps {
	category: string;
	onAdd: (newThing: ThingItem[]) => void;
}

export function CreateThing(props: ThingNameFieldProps) {
	const [title, setTitle] = useState('');

	function handleTitleChange(event: FormEvent) {
		const target: HTMLInputElement = event.target as HTMLInputElement;
		setTitle(target.value);
	}

	function handleSubmit(event: FormEvent) {
		event.preventDefault();
		const newThings = title.split('\n').map(item => ({
			title: item,
			category: props.category
		}));
		thingDB.addMultiple(newThings)
		.then(() => props.onAdd(newThings));
		setTitle('');
	};

	return <form onSubmit={handleSubmit}>
		<input className="create-thing__input" placeholder={'New ' + props.category + '...'} onChange={handleTitleChange}
			   value={title}/>
		<textarea className="create-thing__input" placeholder={'Multiple ' + props.category + '...'} onChange={handleTitleChange}
				  value={title}></textarea>
		<button onClick={handleSubmit}>Submit</button>
	</form>;
}
