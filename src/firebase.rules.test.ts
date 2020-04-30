// @ts-ignore
const fs = require('fs');
const firebase = require('@firebase/testing');
const projectId = `rules-spec-${Date.now()}`;

afterAll(async () => {
	await Promise.all(firebase.apps().map((app) => app.delete()));
});

test('alice get all things', async () => {
	const db = firebase.initializeTestApp({
		projectId: projectId,
		auth: {
			uid: 'alice',
			email: 'alice@example.com'
		}
	}).firestore();
	await firebase.loadFirestoreRules({
		projectId: projectId,
		rules: fs.readFileSync('firestore.rules', 'utf8')
	});
	await firebase.assertSucceeds(db.collection('things').get());
	await firebase.clearFirestoreData({projectId: projectId});
});

test('alice cannot write things', async () => {
	const db = firebase.initializeTestApp({
		projectId: projectId,
		auth: {
			uid: 'alice',
			email: 'alice@example.com'
		}
	}).firestore();
	await firebase.loadFirestoreRules({
		projectId: projectId,
		rules: fs.readFileSync('firestore.rules', 'utf8')
	});
	await firebase.assertFails(db.collection('things').add({
		title: 'blah'
	}));
	await firebase.clearFirestoreData({projectId: projectId});
});
