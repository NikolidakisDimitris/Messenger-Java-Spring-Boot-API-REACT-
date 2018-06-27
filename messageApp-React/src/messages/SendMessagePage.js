import React, { Component } from 'react'
import { UsersListDetails } from '../users/UsersListDetails'
import { Button, Form, FormGroup, Label, Input, Alert, Col } from 'reactstrap'
import { sendMessageRequest } from '../utils/Utils'

export class SendMessagePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            receiver: null,
            message: '',
            sendStatus: {
                statusMessage: '',
                pending: false,
                success: false
            }
        }

        this.selectUser = this.selectUser.bind(this)
        this.close = this.close.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handlEscape = this.handlEscape.bind(this)
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handlEscape, false)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handlEscape, false)
    }

    handlEscape(e) {
        if (e.keyCode == 27) {
            this.close()
        }
    }

    selectUser(user) {
        this.setState({
            receiver: user.username
        })
    }
    close() {
        this.setState({
            receiver: null,
            sendStatus: {
                statusMessage: '',
                pending: false,
                success: false
            }
        })
    }

    handleChange(event) {
        const name = event.target.name
        const value = event.target.value

        this.setState({ [name]: value })
    }

    handleSubmit(event) {
        event.preventDefault()

        //force submit button to loose focus
        //body need focus (keydown eventlistener)
        event.target.lastChild.blur()

        this.setState({
            sendStatus: {
                pending: true,
                statusMessage: '',
                success: false
            }
        })

        const msgReqBody = {
            message: this.state.message,
            receiver: this.state.receiver,
            id: '',
            sender: ''
        }

        const request = sendMessageRequest(msgReqBody)
        this.send(request)
            .then(response => {
                this.setState({
                    sendStatus: {
                        statusMessage: 'Your message has been sent succesfully!',
                        pending: false,
                        success: true
                    },
                    message: ''
                })
            })
            .catch(error => {
                this.setState({
                    sendStatus: {
                        statusMessage: error.message,
                        pending: false,
                        success: false
                    }
                })
            })

    }
    send(request) {
        return fetch(request.url, request)
            .then(response =>
                response.json().then(json => {
                    if (!response.ok) {
                        return Promise.reject(json)
                    }
                    return json
                })
            )
    }

    render() {
        return (
            <div>
                <h3>Send new Message</h3>

                {
                    this.state.sendStatus.pending ?
                        <Alert color='info'>Sending, please wait...</Alert> :
                        this.state.sendStatus.statusMessage.length > 0 ?
                            this.state.sendStatus.success ?
                                <Alert color='success'>{this.state.sendStatus.statusMessage}</Alert> :
                                <Alert color='danger'>{this.state.sendStatus.statusMessage}</Alert> : null
                }

                {
                    !this.state.receiver ?

                        <UsersListDetails onSelect={this.selectUser} /> :
                        <div>
                            <div className='edit-close point' onClick={this.close}>
                                <span>Close <i className='fas fa-times'></i></span>
                            </div>
                            <Form onSubmit={this.handleSubmit} autoComplete='off'>
                                <FormGroup row>

                                    <Label for='password' md={2}>
                                        <span>To</span>
                                    </Label>
                                    <Col md={10}>
                                        <Input type='text' id='receiverUsername' name='receiverUsername' placeholder='Username' value={this.state.receiver} disabled />
                                    </Col>

                                </FormGroup>

                                <FormGroup row>
                                    <Label for='message' md={2}>Message</Label>
                                    <Col md={10}>
                                        <Input type='textarea' rows={4} md={10} name='message' id='message' placeholder='Your message goes here...' onChange={this.handleChange} value={this.state.message} />
                                    </Col>
                                </FormGroup>
                                <div className='my-1 text-right'>{250 - this.state.message.length} characters left</div>
                                <Button type='submit' color='primary' className='ml-auto d-flex'
                                    disabled={this.state.message.length > 250
                                        || this.state.message.length < 1}>
                                    Send
                                </Button>
                            </Form>
                        </div>
                }
            </div>
        )
    }
}