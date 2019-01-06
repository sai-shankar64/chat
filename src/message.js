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
                <div><strong>{this.from}</strong> : { this.props.message}</div>
            </div>
		);
	}
}

export default Message;
