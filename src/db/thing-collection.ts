import { ThingItem } from '../data-model';
import { getStore } from './firebase-util';

export class ThingCollection {
	private things: ThingItem[] = [];
	private categories: Set<string> = new Set();

	constructor(initialList: ThingItem[]) {
		initialList.forEach((item) => {
			this.addNewThingToList(item);
		});
	}

	public getAll(): ThingItem[] {
		return this.things;
	}

	public getCategories(): string[] {
		return Array.from(this.categories);
	}

	public getByCategory(category: string): ThingItem[] {
		return this.things.filter((item: ThingItem) => {
			return item.category === category;
		});
	}

	public add(thingToAdd: ThingItem) {
		return getStore()
		.collection('things')
		.add(thingToAdd)
		.then((docRef) => {
			const newThing = {id: docRef.id, ...thingToAdd};
			this.addNewThingToList(newThing);
			return newThing;
		});
	}

	public delete(thingToRemove: ThingItem) {
		return getStore()
		.collection('things')
		.doc(thingToRemove.id).delete()
		.then(() => this.removeThingFromList(thingToRemove));
	}

	public update(things: ThingItem[]): Promise<void> {
		const batch = getStore().batch();
		things.forEach((thing: ThingItem) => {
			batch.update(getStore().collection('things').doc(thing.id), {
				level: thing.level,
				seq: thing.seq
			});
		});
		return batch.commit();
	}

	private addNewThingToList(newThing: ThingItem) {
		this.things.push(newThing);
		this.categories.add(newThing.category);
	}

	private removeThingFromList(thingToRemove: ThingItem) {
		const indexToDelete = this.things.indexOf(thingToRemove);
		this.things.splice(indexToDelete, 1);
	}
}
