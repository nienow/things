import * as React from 'react';
import { useState } from 'react';
import { getThings } from '../thing-db';
import { ThingItem } from '../data-model';

export const UiMain = () => {
	const things: ThingItem[] = getThings();
	const [card, setCard] = useState();

	const randomCard = () => {
		const index = Math.floor(Math.random() * things.length);
		setCard(things[index]);
	};

	const displayCard = () => {
		if (card) {
			return <div>{card.title} ({card.category})</div>;
		} else {
			return <div></div>;
		}
	};

	return <div>
		<button onClick={randomCard}>New Card</button>
		{displayCard()}
	</div>;
};
