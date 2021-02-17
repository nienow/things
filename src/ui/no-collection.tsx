import * as React from 'react';
import {
	FormEvent,
	useState
} from 'react';
import { useHistory } from 'react-router-dom';

export const UINoCollection = () => {
	const [collection, setCollection] = useState('');
	const history = useHistory();

	function handleCollectionChange(event: FormEvent) {
		const target: HTMLInputElement = event.target as HTMLInputElement;
		setCollection(target.value);
	}

	function handleSubmit() {
		history.push('/ui/' + collection);
	};

	return <form onSubmit={handleSubmit}>
		<div>Select a collection:</div>
		<input className="create-thing__input" placeholder={''} onChange={handleCollectionChange} value={collection}/>
	</form>;
};
