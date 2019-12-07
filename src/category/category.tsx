import * as React from 'react';
import { FormEvent } from 'react';
import {
	getDB,
	ThingItem
} from '../data/data';
import './category.css';
import ThingList from '../list/list';
import LevelLists from '../level-list/level-lists';
import { TextField } from '@material-ui/core';

interface CategoryState {
	data: any[];
	value: string;
	categoryDetails: boolean;
}

interface CategoryProps {
	category: string;
	data: ThingItem[];
}

export default class ThingCategory extends React.Component<CategoryProps, CategoryState> {
	constructor(props: CategoryProps) {
		super(props);
		this.state = {
			data: props.data,
			value: '',
			categoryDetails: false
		};
	}

	handleSubmit(event: FormEvent) {
		event.preventDefault();
		getDB()
		.collection('things')
		.add({
			title: this.state.value,
			category: this.props.category
		})
		.then(() => {
			this.state.data.push({
				title: this.state.value,
				category: this.props.category
			});
			this.setState({
				data: this.state.data,
				value: ''
			});
		});
	}

	handleChange(event: FormEvent) {
		const target: HTMLInputElement = event.target as HTMLInputElement;
		this.setState({value: target.value});
	}

	goToCategory() {
		this.setState({
			categoryDetails: true
		});
	}

	onClose() {
		this.setState({
			categoryDetails: false
		});
	}

	render() {
		return (<div className="category">
			<a className="category__name" onClick={this.goToCategory.bind(this)}>{this.props.category}</a>
			<div className="category__total">({this.state.data.length})</div>
			<form onSubmit={this.handleSubmit.bind(this)}>
				<TextField id="outlined-basic" placeholder={'New ' + this.props.category + '...'} variant="outlined" onChange={this.handleChange.bind(this)} value={this.state.value}/>
			</form>

			<LevelLists open={this.state.categoryDetails} data={this.state.data} categoryName={this.props.category} onClose={this.onClose.bind(this)}/>
		</div>);
	}
}
