import * as React from 'react';
import {
	DragDropContext,
	Droppable,
	Draggable
} from 'react-beautiful-dnd';
import './list.css';

interface ThingListState {
	data: any[];
}

interface ThingListProps {
	data: any[];
}

const reorder = (list: any[], startIndex: number, endIndex: number) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

export default class ThingList extends React.Component<ThingListProps, ThingListState> {
	constructor(props: ThingListProps) {
		super(props);
		this.state = {
			data: props.data
		};
	}

	componentDidUpdate(prevProps: Readonly<ThingListProps>, prevState: Readonly<ThingListState>, snapshot?: any): void {
		if (this.props.data !== prevProps.data) {
			this.setState({
				data: this.props.data
			});
		}
	}

	onDragEnd(result: any) {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const items = reorder(this.state.data, result.source.index, result.destination.index);

		this.setState({
			data: items
		});
	}

	render() {
		return (<DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
				<Droppable droppableId="droppable">
					{(provided, snapshot) => (<div
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{this.state.data.map(
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
			</DragDropContext>);
	}
}
