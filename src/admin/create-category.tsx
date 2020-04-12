import * as React from 'react';
import {
	FormEvent,
	useState
} from 'react';
import './create-category.css';
import { useHistory } from 'react-router-dom';
import { thingDB } from '../db/thing-db';

export const CreateCategory = () => {
	const history = useHistory();
	const [newCat, setNewCat] = useState('');
	const [newTitle, setNewTitle] = useState('');

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		thingDB.add({
			title: newTitle,
			category: newCat
		}).then(() => {
			history.push('/admin');
		});
	};

	const handleCatChange = (event: FormEvent) => {
		const target: HTMLInputElement = event.target as HTMLInputElement;
		setNewCat(target.value);
	};

	const handleTitleChange = (event: FormEvent) => {
		const target: HTMLInputElement = event.target as HTMLInputElement;
		setNewTitle(target.value);
	};

	return (<div className="create-category">
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={newCat}
				onChange={handleCatChange}
				placeholder={'New Category...'}
			/>
			<input
				type="text"
				value={newTitle}
				onChange={handleTitleChange}
				placeholder={'New Title...'}
			/>
			<button type="submit">Submit</button>
		</form>
	</div>);
};
