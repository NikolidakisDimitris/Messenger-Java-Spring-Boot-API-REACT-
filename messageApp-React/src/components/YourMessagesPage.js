import React, { Component } from 'react'
import { MessageBoard } from '../messages/MessageBoard'


export class YourMessagesPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h3>Your Messages</h3>
                <MessageBoard roles={this.props.roles} />
            </div>
        )
    }

}

