import * as React from 'react';
import {FormEvent, useState} from 'react';
import {
	getDB
} from '../firebase-util';
import './category.css';
import { TextField } from '@material-ui/core';
import {ThingItem} from "../data-model";
import {LevelLists} from "./level-lists";

interface CategoryProps {
	category: string;
	data: ThingItem[];
}

export const ThingCategory = (props: CategoryProps) => {
	const [data, setData] = useState(props.data);
	const [value, setValue] = useState('');
	const [categoryDetails, setCategoryDetails] = useState(false);

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

		getDB()
		.collection('things')
		.add({
			title: value,
			category: props.category
		})
		.then(() => {
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
		setCategoryDetails(true);
	};

	const onClose = () => {
		setCategoryDetails(false);
	};

	return (<div className="category">
		<a className="category__name" onClick={goToCategory}>{props.category}</a>
		<div className="category__total">({data.length})</div>
		<form onSubmit={handleSubmit}>
			<TextField id="outlined-basic" placeholder={'New ' + props.category + '...'} variant="outlined"
						 onChange={handleChange} value={value}/>
		</form>

		<LevelLists open={categoryDetails} data={data} categoryName={props.category}
					onClose={onClose}/>
	</div>);
};
