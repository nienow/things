import { default as React } from 'react';
import { ThingCategory } from './category';
import { useHistory } from 'react-router-dom';
import { thingDB } from '../db/thing-db';
import './category-list.css';

export const CategoryList = () => {
	const history = useHistory();
	const categories = thingDB.getCategories();

	const loopCats = () => {
		if (categories) {
			return categories.map((cat: string) => {
				return <ThingCategory category={cat}/>;
			});
		}
	};

	const handleClick = () => {
		history.push('/admin/create');
	};

	return <div className="category-list">
		<button onClick={handleClick}>New Category</button>
		<span className="category-list__total">Total Categories: {categories.length}</span>
		<div>
			{loopCats()}
		</div>
	</div>;
};
