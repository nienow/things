import * as React from 'react';
import {
	isSignedIn,
	signInToDB
} from '../data/data';

interface AdminState {
	auth: boolean;
}

export default class Admin extends React.Component<{}, AdminState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			auth: false
		};
	}

	signIn() {
		signInToDB().then(() => {
			this.setState({
				auth: true
			});
		});
	}

	render() {
		let button;
		if (isSignedIn()) {
			button = <div/>;
		} else {
			button = <button onClick={this.signIn.bind(this)}>Sign In</button>;
		}

		return <div>{button}</div>;
	}
}
