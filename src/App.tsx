import React, { Component } from 'react';
import './App.css';
import Root  from "./Containers/Root/Root";

class App extends Component {
	render() {
		return (
			<div className={'App-wrapper'}>
				<Root/>
			</div>
		);
	}
}

export default App;
