import * as React from 'react';
import Admin from '../admin/admin';
import ThingCategory from '../category/category';
import {
	getDB,
	ThingItem
} from '../data/data';
import './create-category.css';
import { FormEvent } from 'react';
import { Popover } from '@material-ui/core';
import Button from '@material-ui/core/Button';

interface CreateCategoryState {
	newCat: string;
	newTitle: string;
	popoverEl: any;
}

export default class CreateCategory extends React.Component<{}, CreateCategoryState> {

	constructor(props: {}) {
		super(props);
		this.state = {
			newCat: '',
			newTitle: '',
			popoverEl: null
		};
	}

	handleSubmit(event: FormEvent) {
		event.preventDefault();
		getDB()
		.collection('things')
		.add({
			title: this.state.newTitle,
			category: this.state.newCat
		})
		.then(() => {
			// event to re-fetch data
		});
	}

	handleCatChange(event: FormEvent) {
		const target: HTMLInputElement = event.target as HTMLInputElement;
		this.setState({newCat: target.value});
	}

	handleTitleChange(event: FormEvent) {
		const target: HTMLInputElement = event.target as HTMLInputElement;
		this.setState({newTitle: target.value});
	}

	handleClick(event: FormEvent) {
		this.setState({
			popoverEl: event.currentTarget
		})
	}

	handleClose() {
		this.setState({
			popoverEl: null
		});
	}

	render() {
		return (<div className="create-category">
			<Button color="primary" onClick={this.handleClick.bind(this)}>
				New Category
			</Button>
			<Popover
				className="create-category__popover"
				id="newCatPopover"
				open={Boolean(this.state.popoverEl)}
				anchorEl={this.state.popoverEl}
				onClose={this.handleClose.bind(this)}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<input
						type="text"
						value={this.state.newCat}
						onChange={this.handleCatChange.bind(this)}
						placeholder={'New Category...'}
					/>
					<input
						type="text"
						value={this.state.newTitle}
						onChange={this.handleTitleChange.bind(this)}
						placeholder={'New Title...'}
					/>
					<button type="submit">Submit</button>
				</form>
			</Popover>
		</div>);
	}
}
