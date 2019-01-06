import React, { Component } from 'react';

class Message extends Component {
	constructor(props) {
        super(props);
        this.from=this.props.from;
        this.message=this.props.message;
	}
	render() {
		return (
			<div>
                <pre><strong>{this.from}</strong> : {this.message}</pre>
            </div>
		);
	}
}

export default Message;
