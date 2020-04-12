import { ThingItem } from '../data-model';
import { ThingCollection } from './thing-collection';
import { getStore } from './firebase-util';

export let thingDB: ThingCollection;
const thingPromise = getStore()
.collection('things')
.get()
.then((querySnapshot) => {
	const thingList: ThingItem[] = [];
	querySnapshot.forEach((doc) => {
		thingList.push({
			id: doc.id, ...doc.data()
		} as ThingItem);
	});
	thingDB = new ThingCollection(thingList);
});

export function whenThingsLoaded(): Promise<void> {
	return thingPromise;
};
