import React, { Component } from 'react'
import { getMessagesRequest, deleteMessageRequest } from '../utils/Utils'
import { Alert } from 'reactstrap'

import { EditMessage } from './EditMessage'

export class MessageReader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            isLoading: true,
            editMode: false,
            deleteConfMsg: null,
            editResponse: {
                id: '',
                message: ''
            },
            error: null
        }
        this.handleEdit = this.handleEdit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.onSuccessEdit = this.onSuccessEdit.bind(this)
        this.onFailEdit = this.onFailEdit.bind(this)
        this.deleteConfirmation = this.deleteConfirmation.bind(this)
        this.closeConfirm = this.closeConfirm.bind(this)
    }

    componentDidMount() {
        this.getMessages()
        this.timerID = setInterval(
            () => this.getMessages(),
            10000
        )
    }
    componentWillUnmount(){
        clearInterval(this.timerID)
    }

    getMessages() {
        const request = getMessagesRequest(this.props.msgType, this.props.username)
        fetch(request.url, request)
            .then(res => res.json()
                .then(json => {
                    if (!res.ok) {
                        return Promise.reject(json)
                    }
                    return json
                }))
            .then(
                (result) => this.setState({
                    messages: result.sort((a, b) => a.id - b.id).reverse(),
                    isLoading: false
                })
            )
            .catch(error => this.setState({
                isLoading: false,
                error
            })
            )
    }

    drawEditResponse(id) {
        if (this.state.editResponse.id == id
            && this.state.editResponse.message.length > 0) {
            return (
                <div className='editResponse'>
                    {this.state.editResponse.message}
                </div>
            )

        }
    }

    drawMsgHeader(sender, receiver, id) {
        if (this.props.msgType === 'received') {
            return (
                <div className='message__header'>
                    <div className='person'>from: <span>{sender}</span></div>
                    {this.drawEditResponse(id)}
                    <div className='icon'><i className='fas fa-arrow-down'></i></div>
                </div>
            )
        } else if (this.props.msgType === 'sent') {
            return (
                <div className='message__header'>
                    <div className='person'>to: <span>{receiver}</span></div>
                    {this.drawEditResponse(id)}
                    <div className='icon'><i className='fas fa-arrow-up'></i></div>
                </div>
            )
        }
    }

    handleEdit(e) {
        const id = e.target.getAttribute('data-key')
        if (this.state.editMode == id) {
            this.setState({ editMode: '' })
        } else {
            this.setState({
                editMode: id,
                deleteConfMsg: null
            })
        }
    }

    handleDelete(e) {

        const id = e.target.getAttribute('data-key')
        const request = deleteMessageRequest(id)

        fetch(request.url, request)
            .then(res => res.json())
            .then(
                (result) => {
                    document.getElementById(this.props.msgType + id).classList.add('deleteMessage')
                    setTimeout(() =>
                        this.removeMsgFromList(id),
                        600)
                },
                (error) => {
                    this.setState({
                        editResponse: {
                            id: id,
                            message: 'Delete error: ' + error.message
                        }
                    })
                })
    }

    removeMsgFromList(id) {
        let msgListCopy = this.state.messages.slice()
        const index = msgListCopy.indexOf(this.state.messages.find(msg => msg.id == id))
        // ?lert (index)
        if (index > -1) {
            msgListCopy.splice(index, 1)
        }
        this.setState({
            messages: msgListCopy
        })
    }

    onSuccessEdit(id, txt) {
        const msgListCopy = this.state.messages.slice()
        const index = msgListCopy.indexOf(this.state.messages.find(msg => msg.id == id))
        msgListCopy[index].message = txt
        this.setState({
            editMode: '',
            editResponse: {
                id: id,
                message: 'Updated successfully'
            },
            messages: msgListCopy
        })

    }

    onFailEdit(id, txt) {
        this.setState({
            editMode: '',
            editResponse: {
                id: id,
                message: 'Update fail: ' + txt
            },
        })

    }
    deleteConfirmation(e) {
        this.setState({
            deleteConfMsg: e.target.getAttribute('data-key')
        })
    }

    closeConfirm() {
        this.setState({
            deleteConfMsg: false
        })
    }

    render() {
        return (
            <div>
                <div className='mb-1 text-right'>{this.state.messages.length} messages</div>
                {this.state.error ? <div className='message noMessages'>{this.state.error.message}</div> :
                    this.state.messages.length < 1 ? <div className='message noMessages'>No messages</div> :
                        this.state.messages.map(
                            message =>
                                <div key={message.id} id={this.props.msgType + message.id} className='message'>


                                    {this.drawMsgHeader(message.sender, message.receiver, message.id)}

                                    {this.state.deleteConfMsg == message.id ?
                                        <Alert color='danger' className='confirmation'>
                                            Are you sure you want to delete this message?
                                        <div className='d-flex justify-content-around'>
                                                <div onClick={this.handleDelete} data-key={message.id} className='point text-danger'>
                                                    Yes, delete it now!
                                            </div>
                                                <div onClick={this.closeConfirm} className='point text-success'>
                                                    No, keep it
                                            </div>
                                            </div>
                                        </Alert>
                                        : null
                                    }
                                    <div className='message__body'>
                                        {this.state.editMode == message.id ?
                                            <EditMessage message={message}
                                                onSuccess={this.onSuccessEdit}
                                                onFailure={this.onFailEdit}
                                            /> :
                                            message.message}
                                    </div>
                                    <div className='message__tools'>
                                        {
                                            (this.props.roles.indexOf('ROLE_ADMIN') != -1 ||
                                                this.props.roles.indexOf('ROLE_GOD') != -1) ?
                                                this.state.editMode != message.id ?
                                                    <div><i data-key={message.id} onClick={this.handleEdit} className='fas fa-edit'></i></div> :
                                                    <div><i data-key={message.id} onClick={this.handleEdit} className='fas fa-times'></i></div>
                                                : null
                                        }
                                        <div >
                                            <i data-key={message.id} onClick={this.deleteConfirmation} className='fas fa-trash-alt'></i>
                                        </div>

                                    </div>

                                </div>
                        )}
            </div>
        )
    }
}