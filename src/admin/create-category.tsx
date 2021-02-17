import * as React from 'react';
import {
	FormEvent,
	useState
} from 'react';
import './create-category.css';
import {
	useHistory,
	useParams
} from 'react-router-dom';
import { thingDB } from '../db/thing-db';

export const CreateCategory = () => {
	const {collection} = useParams();
	const history = useHistory();
	const [newCat, setNewCat] = useState('');
	const [items, setItems] = useState('');

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		thingDB.addMultiple(items.split('\n').map(item => ({
			title: item,
			category: newCat
		}))).then(() => {
			history.push('/admin/' + collection);
		});
	};

	const handleCatChange = (event: FormEvent) => {
		const target: HTMLInputElement = event.target as HTMLInputElement;
		setNewCat(target.value);
	};

	const handleItemChange = (event: FormEvent) => {
		const target: HTMLInputElement = event.target as HTMLInputElement;
		setItems(target.value);
	};

	return (<div className="create-category">
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={newCat}
				onChange={handleCatChange}
				placeholder={'New Category...'}
			/>
			<textarea
				value={items}
				onChange={handleItemChange}
				placeholder={'Items...'}
				rows={50}
			></textarea>
			<button type="submit">Submit</button>
		</form>
	</div>);
};
