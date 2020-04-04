import * as React from 'react';
import {
	DragDropContext,
	Draggable,
	Droppable
} from 'react-beautiful-dnd';
import './list.css';
import {useState} from "react";

interface ThingListProps {
	data: any[];
}

const reorder = (list: any[], startIndex: number, endIndex: number) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

export const ThingList = (props: ThingListProps) => {
	const [data, setData] = useState(props.data);

	const onDragEnd = (result: any) => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const items = reorder(data, result.source.index, result.destination.index);

		setData(items);
	};

	return (<DragDropContext onDragEnd={onDragEnd}>
		<Droppable droppableId="droppable">
			{(provided, snapshot) => (<div
				{...provided.droppableProps}
				ref={provided.innerRef}
			>
				{data.map((item, index) => (<Draggable key={item.title} draggableId={item.title} index={index}>
					{(provided, snapshot) => (<div className="list-item"
													 ref={provided.innerRef}
													 {...provided.draggableProps}
													 {...provided.dragHandleProps}
					>
						{item.title}
					</div>)}
				</Draggable>))}
				{provided.placeholder}
			</div>)}
		</Droppable>
	</DragDropContext>);
}
