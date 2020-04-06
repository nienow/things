import { default as React } from 'react';
import {
	getCategories,
	getThingMap
} from '../thing-db';
import { ThingCategory } from './category';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

export const CategoryList = () => {
	const history = useHistory();
	const categories = getCategories();
	const data = getThingMap();

	const loopCats = () => {
		if (categories) {
			return categories.map((cat: string) => {
				const dataOrEmpty = data.get(cat) || [];
				return <ThingCategory category={cat} data={dataOrEmpty}/>;
			});
		}
	};

	const handleClick = () => {
		history.push('/admin/create');
	};

	return <div className="main">
		<Button color="primary" onClick={handleClick}>
			New Category
		</Button>
		<div className="category-list">
			{loopCats()}
		</div>
	</div>;
};
