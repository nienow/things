import * as React from 'react';
import Admin from '../admin/admin';
import ThingCategory from '../category/category';
import {
	getDB,
	ThingItem
} from '../data/data';
import './main.css';
import CreateCategory from '../create-category/create-category';

interface MainState {
	categories: string[];
	data: Map<string, ThingItem[]>;
}

export default class Main extends React.Component<{}, MainState> {

	constructor(props: {}) {
		super(props);
		this.state = {
			categories: [],
			data: new Map()
		};
	}

	componentDidMount(): void {
		this.fetchData();
	}

	parseData(data: ThingItem[]) {
		data.forEach((item: ThingItem) => {
			let category = this.state.data.get(item.category);
			if (!category) {
				category = [];
				this.state.data.set(item.category, category);
				this.state.categories.push(item.category);
			}
			category.push(item);
		});
		this.setState({
			categories: this.state.categories,
			data: this.state.data
		});
	}

	fetchData() {
		getDB()
		.collection('things')
		.get()
		.then((querySnapshot) => {
			const data: ThingItem[] = [];
			querySnapshot.forEach((doc) => {
				data.push({
					id: doc.id,
					...doc.data()
				} as ThingItem);
			});
			this.parseData(data);
		});
	}

	loopCats() {
		if (this.state.categories) {
			return this.state.categories.map((cat: string) => {
				const data = this.state.data.get(cat) || [];
				return <ThingCategory category={cat} data={data}/>;
			});
		}
	}

	render() {
		return (<div className="main">
			<Admin/>
			<CreateCategory></CreateCategory>
			<div className="category-list">
				{this.loopCats()}
			</div>
		</div>);
	}
}
