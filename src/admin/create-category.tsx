import * as React from 'react';
import {FormEvent, useState} from 'react';
import { getDB } from '../firebase-util';
import './create-category.css';
import { Popover } from '@material-ui/core';
import Button from '@material-ui/core/Button';

interface CreateCategoryState {
	newCat: string;
	newTitle: string;
	popoverEl: any;
}

export const CreateCategory = () => {

	const [newCat, setNewCat] = useState('');
	const [newTitle, setNewTitle] = useState('');
	const [popoverEl, setPopoverEl] = useState(null);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		getDB()
		.collection('things')
		.add({
			title: newTitle,
			category: newCat
		})
		.then(() => {
			// event to re-fetch data
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

	const handleClick = (event: FormEvent) => {
		setPopoverEl(event.currentTarget);
	};

	const handleClose = () => {
		setPopoverEl(null);
	};

	return (<div className="create-category">
		<Button color="primary" onClick={handleClick}>
			New Category
		</Button>
		<Popover
			className="create-category__popover"
			id="newCatPopover"
			open={Boolean(popoverEl)}
			anchorEl={popoverEl}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
		>
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
		</Popover>
	</div>);
};
