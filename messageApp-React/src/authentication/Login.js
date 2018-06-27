
import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import { loginRequest } from '../utils/Utils'


export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usernameOrEmail: '',
            password: '',
            isLoading: false,
            success: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleMessage = this.handleMessage.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    login(request) {
        // alert(request)
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

    handleMessage(msg) {
        this.props.msghandler(msg)
    }
    handleLogin() {
        this.props.handleLogin()
    }



    handleSubmit(event) {
        event.preventDefault()
        this.handleMessage({
            type: 'info',
            message: 'Loading. Plese Wait...'
        })

        const loginReqBody = {
            usernameOrEmail: this.state.usernameOrEmail,
            password: this.state.password
        }
        const request = loginRequest(loginReqBody)

        this.login(request)
            .then((response) => {
                localStorage.setItem('accessToken', response.accessToken)
                this.handleMessage({
                    type: 'success',
                    message: 'Successful login'
                })
                this.setState({ success: true })
                this.handleLogin()
            })
            .catch(error => {
                this.handleMessage({
                    type: 'danger',
                    message: error.message
                })
                this.setState({
                    usernameOrEmail: '',
                    password: ''
                })
            })
    }

    handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value

        this.setState({ [name]: value })

    }

    render() {
        return (
            <div className='container'>
                <Form onSubmit={this.handleSubmit} autoComplete='off'>

                    <FormGroup>
                        <Input type='text' name='usernameOrEmail' id='usernameOrEmail' placeholder='Username or Email'
                            onChange={this.handleChange} value={this.state.usernameOrEmail}
                        />
                        <FormFeedback>Required</FormFeedback>
                        <Label for='userameOrEmail' >Username or Email</Label>
                    </FormGroup>
                    <FormGroup>
                        <Input type='password' name='password' id='password' placeholder='Password'
                            onChange={this.handleChange} value={this.state.password} />
                        <Label for='password'>Password</Label>
                    </FormGroup>
                    <Button type='submit' color='primary'
                        disabled={!(this.state.usernameOrEmail.length > 0 && this.state.password.length > 0)}>
                        Login</Button>
                </Form>
            </div>
        )
    }
}