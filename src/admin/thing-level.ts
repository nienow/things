import { ThingItem } from '../data-model';

export class ThingLevel {
	public static readonly NUMBER_LEVELS = 6;

	private levels: any[][] = [];

	public initLevels(things: ThingItem[]) {
		for (let i = 0; i < ThingLevel.NUMBER_LEVELS; i++) {
			this.levels[i] = [];
		}
		things.forEach((thing) => {
			this.levels[thing.level || 0].push(thing);
		});
	}

	public reorder(index: number, startIndex: number, endIndex: number) {
		const list = this.levels[index];
		const [removed] = list.splice(startIndex, 1);
		list.splice(endIndex, 0, removed);
	}

	public move(sourceIndex: number, destinationIndex: number, droppableSource: any, droppableDestination: any) {
		const source = this.levels[sourceIndex];
		const dest = this.levels[destinationIndex];
		const [removed] = source.splice(droppableSource.index, 1);
		dest.splice(droppableDestination.index, 0, removed);
	}
}
