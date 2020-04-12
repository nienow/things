import * as React from 'react';
import { useState } from 'react';
import {
	DragDropContext,
	Draggable,
	Droppable
} from 'react-beautiful-dnd';
import './level-lists.css';
import {
	Button,
	IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ThingItem } from '../data-model';
import { useParams } from 'react-router-dom';
import { thingDB } from '../db/thing-db';
import { CreateThing } from './create-thing';

const reorder = (list: any[], startIndex: number, endIndex: number) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const move = (source: any[], destination: any[], droppableSource: any, droppableDestination: any) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	destClone.splice(droppableDestination.index, 0, removed);

	const result: any = {};
	result[droppableSource.droppableId] = sourceClone;
	result[droppableDestination.droppableId] = destClone;

	return result;
};

export const LevelLists = () => {
	let {categoryName} = useParams();
	const initialLevels: any[][] = [
		[],
		[],
		[],
		[],
		[],
		[],
		[]
	];
	const data = thingDB.getByCategory(categoryName);
	data.forEach((item: any) => {
		initialLevels[item.level || 0].push(item);
	});

	const [levels, setLevels] = useState(initialLevels);
	const [dirty, setDirty] = useState(false);

	const getList = (id: any) => {
		return levels[Number(id)];
	};

	const onDragEnd = (result: any) => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		setDirty(true);

		if (result.source.droppableId === result.destination.droppableId) {
			const id1 = Number(result.source.droppableId);
			const items = reorder(getList(result.source.droppableId), result.source.index, result.destination.index);
			levels[id1] = items;
			setLevels(levels);
		} else {
			const id1 = Number(result.source.droppableId);
			const id2 = Number(result.destination.droppableId);
			const moveResult = move(getList(result.source.droppableId), getList(result.destination.droppableId), result.source,
				result.destination);

			levels[id1] = moveResult[id1];
			levels[id2] = moveResult[id2];
			setLevels(levels);
		}
	};

	const save = () => {
		const dirtyObjs: ThingItem[] = [];
		levels.forEach((level: ThingItem[], levelIndex: number) => {
			level.forEach((item: ThingItem, itemIndex: number) => {
				if (item.level !== levelIndex || item.seq !== itemIndex) {
					item.level = levelIndex;
					item.seq = itemIndex;
					dirtyObjs.push(item);
				}
			});
		});

		if (dirtyObjs.length > 0) {
			thingDB.update(dirtyObjs).then(() => {
				setDirty(false);
			}, () => {
				alert('failed to update');
			});
		}
	};

	const deleteItem = (item: ThingItem, level: number) => {
		thingDB.delete(item)
		.then(() => {
			levels[level].splice(levels[level].indexOf(item), 1);
			setLevels(levels);
		});
	};

	const handleAdd = (newThing: ThingItem) => {
		levels[0].push(newThing);
		setLevels(levels);
	};

	const levelList = (i: number) => {
		return (<Droppable droppableId={'' + i}>
			{(provided, snapshot) => (<div
				{...provided.droppableProps}
				ref={provided.innerRef}
				className="level-list"
			>
				<div>Level {i}</div>
				{levels[i].map((item, index) => (<Draggable key={item.title} draggableId={item.title} index={index}>
					{(provided, snapshot) => (<div className="list-item"
												   ref={provided.innerRef}
												   {...provided.draggableProps}
												   {...provided.dragHandleProps}
					>
						<span>{item.title}</span>
						<IconButton aria-label="delete"
									onClick={deleteItem.bind(null, item, i)}><CloseIcon/></IconButton>
					</div>)}
				</Draggable>))}
				{provided.placeholder}
			</div>)}
		</Droppable>);
	};

	const saveButton = dirty ? <Button onClick={save}>Save</Button> : null;

	return <div>
		<h3>{categoryName}</h3>
		{saveButton}
		<CreateThing category={categoryName} onAdd={handleAdd}/>
		<div className="level-lists">
			<DragDropContext onDragEnd={onDragEnd}>
				{levelList(0)}
				{levelList(1)}
				{levelList(2)}
				{levelList(3)}
				{levelList(4)}
				{levelList(5)}
				{levelList(6)}
			</DragDropContext>
		</div>
	</div>;
};
