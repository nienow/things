import {
	Draggable,
	Droppable
} from 'react-beautiful-dnd';
import * as React from 'react';
import { ThingItem } from '../data-model';

interface LevelProps {
	things: ThingItem[];
	level: number;
	onDelete: (item: ThingItem) => void;
}

export function Level(props: LevelProps) {
	function deleteThing(thing: ThingItem) {
		props.things.splice(props.things.indexOf(thing), 1);
		props.onDelete(thing);
	}

	const draggables = props.things.map((item, index) => {
		return <Draggable key={item.title} draggableId={item.title} index={index}>
			{provided => (
				<div className="list-item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
					<div className="list-item__title">{item.title}</div>
					<button className="list-item__delete" onClick={deleteThing.bind(null, item)}>X</button>
				</div>)}
		</Draggable>;
	});

	return (<Droppable droppableId={'' + props.level}>
		{provided => (<div {...provided.droppableProps} ref={provided.innerRef} className="level-list">
			<div className="level-list__title">Level {props.level}</div>
			{draggables}
			{provided.placeholder}
		</div>)}
	</Droppable>);
}
