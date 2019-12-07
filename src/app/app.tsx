import * as React from 'react';
import './app.css';
import Main from '../main/main';

interface AppState {
}

export default class App extends React.Component<{}, AppState> {

	constructor(props: {}) {
		super(props);
		this.state = {};
	}

	render() {
		return <Main></Main>;
	}
}
