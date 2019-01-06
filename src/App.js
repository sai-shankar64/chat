import React, { Component } from 'react';
import Message from './message';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		}
	}

	componentDidMount() {
		this.connection = new WebSocket('ws://localhost:8000/send-message');
		this.connection.onmessage = event => {

			this.addEvent("Server", JSON.parse(event.data).message)
		}
		this.connection.onopen = event => {
			console.log("Connection Opened..")
		}

	}

	addEvent(from, message) {
		this.setState({ list: this.state.list.concat([{ from: from, message: message, id: this.state.list.length + 1 }]) })
	}

	sendclientmessage(data) {
		this.connection.send(JSON.stringify({ message: data }));
	}

	handleClick() {
		var message = this.refs.input.value;
		message = message.trim();
		if (message !== "" && message !== null) {
			this.refs.input.value = "";
			this.addEvent("Client", message);
			this.sendclientmessage(message);
		}
	}

	onKeyPress = (e) => {
		if (e.which === 13) {
			this.handleClick();
		}
	}

	render() {
		return (
			<div className="App">
				<div>
					{
						this.state.list.length !== 0 && this.state.list.map((res) => (
							<Message from={res.from} message={res.message} key={res.id} />
						))
					}
				</div>
				<div className="col-md-12" style={{ float: "right", border: "black", padding: "0px", display: "table", position: "fixed", bottom: "0px" }}>
					<input ref="input" id="input" type="text" onKeyPress={this.onKeyPress} style={{ display: "table-cell", width: "80%" }} />
					<button ref="button" onClick={this.handleClick.bind(this)} style={{ display: "table-cell", width: "19.5%" }}>Send</button>
				</div>
			</div>
		);
	}
}

export default App;
