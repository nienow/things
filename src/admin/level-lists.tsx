import * as React from 'react';
import { useState } from 'react';
import {
	DragDropContext,
	DropResult
} from 'react-beautiful-dnd';
import './level-lists.css';
import { ThingItem } from '../data-model';
import { useParams } from 'react-router-dom';
import { thingDB } from '../db/thing-db';
import { CreateThing } from './create-thing';
import { Level } from './level';

const NUMBER_LEVELS = 7;

function initializeLists(things: ThingItem[]) {
	const levels: ThingItem[][] = [];
	for (let i = 0; i < NUMBER_LEVELS; i++) {
		levels[i] = [];
	}
	things.forEach((thing) => {
		levels[thing.level || 0].push(thing);
	});
	return levels;
}

function move(source: ThingItem[], dest: ThingItem[], startIndex: any, endIndex: any) {
	const [removed] = source.splice(startIndex, 1);
	dest.splice(endIndex, 0, removed);
}

export function LevelLists() {
	let {categoryName} = useParams();
	const thingList = thingDB.getByCategory(categoryName);

	const [levels, setLevels] = useState(initializeLists(thingList));
	const [dirty, setDirty] = useState(false);

	function onDragEnd(result: DropResult) {
		// dropped outside the list
		if (!result.destination) {
			return;
		}
		const source = levels[Number(result.source.droppableId)];
		const dest = levels[Number(result.destination.droppableId)];
		move(source, dest, result.source.index, result.destination.index);
		setDirty(true);
		setLevels([...levels]);
	}

	function save() {
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
	}

	function deleteItem(item: ThingItem) {
		thingDB.delete(item)
		.then(() => {
			setLevels([...levels]);
		});
	}

	function handleAdd(newThings: ThingItem[]) {
		newThings.forEach((thing) => levels[0].push(thing));
		setLevels([...levels]);
	}

	const levelList = [...Array(NUMBER_LEVELS)].map((item: any, index: number) => {
		return <Level onDelete={deleteItem} things={levels[index]} level={index}></Level>;
	});

	return <div>
		<div className="level-lists-header">
			<CreateThing category={categoryName} onAdd={handleAdd}/>
			{dirty ? <button className="level-lists-header__save" onClick={save}>Save</button> : null}
		</div>
		<div className="level-lists">
			<DragDropContext onDragEnd={onDragEnd}>
				{levelList}
			</DragDropContext>
		</div>
	</div>;
};
