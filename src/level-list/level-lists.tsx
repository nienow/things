import * as React from 'react';
import { FormEvent } from 'react';
import {
	DragDropContext,
	Draggable,
	Droppable
} from 'react-beautiful-dnd';
import './level-lists.css';
import {
	Button,
	Dialog,
	DialogTitle,
	IconButton,
	TextField
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {
	getDB,
	ThingItem
} from '../data/data';

interface LevelListsState {
	levels: ThingItem[][];
	dirty: boolean;
	value: string;
}

interface LevelListsProps {
	categoryName: string;
	data: any[];
	open: boolean;
	onClose: () => void;
}

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

export default class LevelLists extends React.Component<LevelListsProps, LevelListsState> {
	constructor(props: LevelListsProps) {
		super(props);
		this.state = {
			levels: [
				[],
				[],
				[],
				[],
				[],
				[],
				[]
			],
			dirty: false,
			value: ''
		};
		props.data.forEach((item: any) => {
			this.state.levels[item.level || 0].push(item);
		});
	}

	getList(id: any) {
		return this.state.levels[Number(id)];
	}

	onDragEnd(result: any) {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		this.setState({
			dirty: true
		});

		if (result.source.droppableId === result.destination.droppableId) {
			const id1 = Number(result.source.droppableId);
			const items = reorder(this.getList(result.source.droppableId), result.source.index, result.destination.index);
			const levels = this.state.levels;
			levels[id1] = items;
			this.setState({
				levels
			});
		} else {
			const id1 = Number(result.source.droppableId);
			const id2 = Number(result.destination.droppableId);
			const moveResult = move(this.getList(result.source.droppableId), this.getList(result.destination.droppableId),
				result.source, result.destination);

			const levels = this.state.levels;
			levels[id1] = moveResult[id1];
			levels[id2] = moveResult[id2];
			this.setState({
				levels
			});
		}
	}

	save() {
		const dirtyObjs: ThingItem[] = [];
		this.state.levels.forEach((level: ThingItem[], levelIndex: number) => {
			level.forEach((item: ThingItem, itemIndex: number) => {
				if (item.level !== levelIndex || item.seq !== itemIndex) {
					item.level = levelIndex;
					item.seq = itemIndex;
					dirtyObjs.push(item);
				}
			});
		});

		if (dirtyObjs.length > 0) {
			const batch = getDB().batch();
			dirtyObjs.forEach((dirtyObj: ThingItem) => {
				batch.update(getDB().collection('things').doc(dirtyObj.id), {
					level: dirtyObj.level,
					seq: dirtyObj.seq
				});
			});
			batch.commit().then(() => {
				// success
				this.setState({
					dirty: false
				});
			}, () => {
				alert('failed to update');
			});
		}
	}

	deleteItem(item: ThingItem, level: number) {
		getDB()
		.collection('things')
		.doc(item.id).delete()
		.then((docRef) => {
			this.state.levels[level].splice(this.state.levels[level].indexOf(item), 1);
			this.setState({
				levels: this.state.levels,
				value: ''
			});
		});
	}

	handleChange(event: FormEvent) {
		const target: HTMLInputElement = event.target as HTMLInputElement;
		this.setState({value: target.value});
	}

	handleSubmit(event: FormEvent) {
		event.preventDefault();
		getDB()
		.collection('things')
		.add({
			title: this.state.value,
			category: this.props.categoryName
		})
		.then((docRef) => {
			this.state.levels[0].push({
				id: docRef.id,
				title: this.state.value,
				category: this.props.categoryName
			});
			this.setState({
				levels: this.state.levels,
				value: ''
			});
		});
	}

	levelList(i: number) {
		return (<Droppable droppableId={'' + i}>
			{(provided, snapshot) => (<div
				{...provided.droppableProps}
				ref={provided.innerRef}
				className="level-list"
			>
				<div>Level {i}</div>
				{this.state.levels[i].map((item, index) => (<Draggable key={item.title} draggableId={item.title} index={index}>
					{(provided, snapshot) => (<div className="list-item"
												   ref={provided.innerRef}
												   {...provided.draggableProps}
												   {...provided.dragHandleProps}
					>
						<span>{item.title}</span>
						<IconButton aria-label="delete"
									onClick={this.deleteItem.bind(this, item, i)}><CloseIcon/></IconButton>
					</div>)}
				</Draggable>))}
				{provided.placeholder}
			</div>)}
		</Droppable>);
	}

	render() {
		return (
			<Dialog aria-labelledby="simple-dialog-title" open={this.props.open} onClose={this.props.onClose} fullScreen={true}>
				<DialogTitle id="simple-dialog-title">{this.props.categoryName}
					{this.state.dirty ? <span></span> :
						<IconButton aria-label="close" onClick={this.props.onClose}><CloseIcon/></IconButton>}
					<Button onClick={this.save.bind(this)}>Save</Button>
					<form onSubmit={this.handleSubmit.bind(this)}>
						<TextField id="outlined-basic" placeholder={'New ' + this.props.categoryName + '...'} variant="outlined"
								   onChange={this.handleChange.bind(this)} value={this.state.value}/>
					</form>
				</DialogTitle>
				<div className="level-lists">
					<DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
						{this.levelList(0)}
						{this.levelList(1)}
						{this.levelList(2)}
						{this.levelList(3)}
						{this.levelList(4)}
						{this.levelList(5)}
						{this.levelList(6)}
					</DragDropContext></div>
			</Dialog>);
	}
}
