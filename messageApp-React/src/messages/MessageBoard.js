import React, { Component } from 'react'
import { MessageReader } from './MessageReader'
import {Button} from 'reactstrap'

export class MessageBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showSend: false
        }

        this.handleMsgClassToggle = this.handleMsgClassToggle.bind(this)
    }

    handleMsgClassToggle() {
        if (this.state.showSend) {
            this.setState({ showSend: false })
        } else {
            this.setState({ showSend: true })
        }
    }

    render() {
        return (
            <div className='msgBoard'>
                <Button className='msgToggler' onClick={this.handleMsgClassToggle} outline>
                {this.state.showSend? 'Go to received' :'Go to sent'}</Button>
                <div className='messagesContainer'>
                    <div className={this.state.showSend ? 'showSend' : ''}>
                        <h4>Received Messages</h4>
                        <MessageReader msgType='received' 
                        username={this.props.username?this.props.username:null}
                        roles={this.props.roles}/>
                    </div>
                    <div className={this.state.showSend ? 'showSend' : ''}>
                        <h4>Sent Messages</h4>
                        <MessageReader msgType='sent' 
                        username={this.props.username?this.props.username:null}
                        roles={this.props.roles}/>
                    </div>
                </div>
            </div>
        )
    }
} 