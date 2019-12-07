import * as React from 'react';
import {
	DragDropContext,
	Draggable,
	Droppable
} from 'react-beautiful-dnd';
import './level-lists.css';
import {
	Dialog,
	DialogTitle
} from '@material-ui/core';

interface LevelListsState {
	levels: any[][];
}

interface LevelListsProps {
	categoryName: string;
	data: any[];
	open: boolean;
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
				[]
			]
		};
		props.data.forEach((item: any) => {
			this.state.levels[item.level || 0].push(item);
		});
	}

	// componentDidUpdate(prevProps: Readonly<LevelListProps>, prevState: Readonly<LevelListState>, snapshot?: any): void {
	// 	if (this.props.data !== prevProps.data) {
	// 		this.setState({
	// 			data: this.props.data
	// 		});
	// 	}
	// }

	getList(id: any) {
		return this.state.levels[Number(id)];
	}

	onDragEnd(result: any) {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		// if (result.source.droppableId === destination.droppableId) {

		// const items = reorder(this.state.levels[level], result.source.index, result.destination.index);

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

	render() {
		return (<Dialog aria-labelledby="simple-dialog-title" open={this.props.open}>
			<DialogTitle id="simple-dialog-title">{this.props.categoryName}</DialogTitle>
			<DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
				<Droppable droppableId="0">
					{(provided, snapshot) => (<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						className="level-list"
					>
						{this.state.levels[0].map(
							(item, index) => (<Draggable key={item.title} draggableId={item.title} index={index}>
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
				<Droppable droppableId="1">
					{(provided, snapshot) => (<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						className="level-list"
					>
						{this.state.levels[1].map(
							(item, index) => (<Draggable key={item.title} draggableId={item.title} index={index}>
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
				<Droppable droppableId="2">
					{(provided, snapshot) => (<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						className="level-list"
					>
						{this.state.levels[2].map(
							(item, index) => (<Draggable key={item.title} draggableId={item.title} index={index}>
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
			</DragDropContext></Dialog>);
	}
}
