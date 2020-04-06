import { ThingItem } from './data-model';
import { getDB } from './firebase-util';

const things: ThingItem[] = [];
const categories: string[] = [];
const thingMap: Map<string, ThingItem[]> = new Map();

const addToThingMap = (thing: ThingItem) => {
	let category = thingMap.get(thing.category);
	if (!category) {
		category = [];
		thingMap.set(thing.category, category);
		categories.push(thing.category);
	}
	category.push(thing);
};

const removeFromThingMap = (thing: ThingItem) => {
	let category = thingMap.get(thing.category);
	if (category) {
		category.splice(category.indexOf(thing), 1);
		if (category.length === 0) {
			categories.splice(categories.indexOf(thing.category), 1);
		}
	}
};

const thingPromise = getDB()
.collection('things')
.get()
.then((querySnapshot) => {
	querySnapshot.forEach((doc) => {
		things.push({
			id: doc.id, ...doc.data()
		} as ThingItem);
	});

	things.forEach(item => addToThingMap(item));
});

export const whenThingsLoaded = (): Promise<void> => {
	return thingPromise;
};

export const getThings = () => {
	return things;
};

export const getThingMap = () => {
	return thingMap;
};

export const getCategories = () => {
	return categories;
};

export const addThing = (thingToAdd: ThingItem) => {
	return getDB()
	.collection('things')
	.add(thingToAdd)
	.then((docRef) => {
		const newThing = {id: docRef.id, ...thingToAdd};
		things.push(newThing);
		addToThingMap(newThing);
		return newThing;
	});
};

export const deleteThing = (thingToRemove: ThingItem) => {
	return getDB()
	.collection('things')
	.doc(thingToRemove.id).delete()
	.then(() => {
		const indexToDelete = things.indexOf(thingToRemove);
		things.splice(indexToDelete, 1);
		removeFromThingMap(thingToRemove);
	});
};
