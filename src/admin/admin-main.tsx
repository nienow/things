import * as React from 'react';
import {
	useEffect,
	useState
} from 'react';
import { getThings } from '../firebase-util';
import './admin-main.css';
import { AdminLogin } from './admin-login';
import { ThingItem } from '../data-model';
import { ThingCategory } from './category';
import { CreateCategory } from './create-category';

export const AdminMain = () => {
	const [categories, setCategories] = useState([]);
	const [data, setData] = useState(new Map());

	const parseData = (items: ThingItem[]) => {
		const newData = new Map();
		const newCategories: string[] = [];
		items.forEach((item: ThingItem) => {
			let category = newData.get(item.category);
			if (!category) {
				category = [];
				newData.set(item.category, category);
				newCategories.push(item.category);
			}
			category.push(item);
		});
		setData(newData);
		setCategories(newCategories);
	};

	const loopCats = () => {
		if (categories) {
			return categories.map((cat: string) => {
				const dataOrEmpty = data.get(cat) || [];
				return <ThingCategory category={cat} data={dataOrEmpty}/>;
			});
		}
	};

	useEffect(() => {
		getThings().then((things: ThingItem[]) => {
			parseData(things);
		});
	}, []);

	return <div className="main">
		<AdminLogin/>
		<CreateCategory></CreateCategory>
		<div className="category-list">
			{loopCats()}
		</div>
	</div>;
};
