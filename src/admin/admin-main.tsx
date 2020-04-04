import * as React from 'react';
import {
	getDB
} from '../firebase-util';
import './admin-main.css';
import {AdminLogin} from "./admin-login";
import {useState} from "react";
import {ThingItem} from "../data-model";
import {ThingCategory} from "./category";
import {CreateCategory} from "./create-category";

export const AdminMain = () => {
	const [categories, setCategories] = useState([]);
	const [data, setData] = useState(new Map());

	const parseData = (items: ThingItem[]) => {
		items.forEach((item: ThingItem) => {
			let category = data.get(item.category);
			if (!category) {
				category = [];
				data.set(item.category, category);
				categories.push(item.category);
			}
			category.push(item);
		});
		setData(data);
		setCategories(categories);
	};

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
		parseData(data);
	});

	const loopCats = () => {
		if (categories) {
			return categories.map((cat: string) => {
				const dataOrEmpty = data.get(cat) || [];
				return <ThingCategory category={cat} data={dataOrEmpty}/>;
			});
		}
	}

	return (<div className="main">
		<AdminLogin/>
		<CreateCategory></CreateCategory>
		<div className="category-list">
			{loopCats()}
		</div>
	</div>);
}
