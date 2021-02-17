import { ThingItem } from '../data-model';
import { getStore } from './firebase-util';

class ThingService {
	private things: ThingItem[] = [];
	private categories: Set<string> = new Set();

	constructor(private collection: string, initialList: ThingItem[]) {
		initialList.forEach((item) => {
			this.addNewThingToList(item);
		});
	}

	public getCollection(): string {
		return this.collection;
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
		const duplicateThing = this.getThingByTitle(thingToAdd.title);
		if (duplicateThing) {
			throw Error('Failed to add: Duplicate title');
		}
		return getStore()
		.collection(this.collection)
		.add(thingToAdd)
		.then((docRef) => {
			const newThing = {id: docRef.id, ...thingToAdd};
			this.addNewThingToList(newThing);
			return newThing;
		});
	}

	public addMultiple(things: ThingItem[]): Promise<void> {
		const batch = getStore().batch();
		things.forEach((thing: ThingItem) => {
			const doc = getStore().collection(this.collection).doc();
			batch.set(doc, thing);
		});
		return batch.commit();
	}

	public delete(thingToRemove: ThingItem) {
		return getStore()
		.collection(this.collection)
		.doc(thingToRemove.id).delete()
		.then(() => this.removeThingFromList(thingToRemove));
	}

	public update(things: ThingItem[]): Promise<void> {
		const batch = getStore().batch();
		things.forEach((thing: ThingItem) => {
			batch.update(getStore().collection(this.collection).doc(thing.id), {
				level: thing.level,
				seq: thing.seq
			});
		});
		return batch.commit();
	}

	public getThingByTitle(title: string) {
		const lowerCaseTitle = title.toLowerCase();
		return this.things.find(thing => thing.title.toLowerCase() === lowerCaseTitle);
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

export let thingDB: ThingService;

export function loadCollection(name: string): Promise<ThingService> {
	if (thingDB && thingDB.getCollection() === name) {
		return Promise.resolve(thingDB);
	}
	return getStore()
	.collection(name)
	.get()
	.then((querySnapshot) => {
		const thingList: ThingItem[] = [];
		querySnapshot.forEach((doc) => {
			thingList.push({
				id: doc.id, ...doc.data()
			} as ThingItem);
		});
		thingDB = new ThingService(name, thingList);
		return thingDB;
	});
}
