import * as React from 'react';
import {
	FormEvent,
	useState
} from 'react';
import './category.css';
import { TextField } from '@material-ui/core';
import { ThingItem } from '../data-model';
import { addThing } from '../thing-db';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

interface CategoryProps {
	category: string;
	data: ThingItem[];
}

export const ThingCategory = (props: CategoryProps) => {
	const history = useHistory();
	const [data, setData] = useState(props.data);
	const [value, setValue] = useState('');

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (!value) {
			return;
		}
		const hasExisting = data.find((item: ThingItem) => {
			return item.title === value || (item.title.length > 3 && value.indexOf(item.title) >= 0);
		});

		if (hasExisting) {
			return;
		}

		addThing({
			title: value,
			category: props.category
		}).then(() => {
			data.push({
				title: value,
				category: props.category
			});
			setData(data);
			setValue('');
		});
	};

	const handleChange = (event: FormEvent) => {
		const target: HTMLInputElement = event.target as HTMLInputElement;
		setValue(target.value);
	};

	const goToCategory = () => {
		history.push(`/admin/category/${props.category}`);
	};

	return (<div className="category">
		<Button onClick={goToCategory}>{props.category}</Button>
		<div className="category__total">({data.length})</div>
		<form onSubmit={handleSubmit}>
			<TextField id="outlined-basic" placeholder={'New ' + props.category + '...'} variant="outlined"
					   onChange={handleChange} value={value}/>
		</form>
	</div>);
};
