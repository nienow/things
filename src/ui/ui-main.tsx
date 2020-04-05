import * as React from 'react';
import { useState } from 'react';

export const UiMain = () => {
	const [card, setCard] = useState();

	const randomCard = () => {
		setCard(Math.random);
	};

	return <div>
		<button onClick={randomCard}>New Card</button>
		<div>{card}</div>
	</div>;
};
