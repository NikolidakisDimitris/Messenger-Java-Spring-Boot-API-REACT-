import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormFeedback, Alert } from 'reactstrap'
import { signupRequest } from '../utils/Utils'


export class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            formErrors: { email: '', password: '', name: '', username: '' },
            emailValid: false,
            passwordValid: false,
            nameValid: false,
            usernameValid: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleMessage = this.handleMessage.bind(this)
    }

    signup(request) {
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

    handleChange(event) {
        const name = event.target.name
        const value = event.target.value

        this.setState({ [name]: value },
            () => { this.validateField(name, value) })
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors
        let emailValid = this.state.emailValid
        let passwordValid = this.state.passwordValid
        let nameValid = this.state.nameValid
        let usernameValid = this.state.usernameValid

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
                fieldValidationErrors.email = emailValid ? '' : 'Email is invalid'
                break
            case 'password':
                passwordValid = value.length >= 6
                fieldValidationErrors.password = passwordValid ? '' : 'Password is too short'
                break
            case 'name':
                nameValid = value.length > 0
                fieldValidationErrors.name = nameValid ? '' : 'Name is required'
                break
            case 'username':
                usernameValid = value.length > 0
                fieldValidationErrors.username = usernameValid ? '' : 'Username is required'
                break
            default:
                break
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
            nameValid: nameValid,
            usernameValid: usernameValid
        }, this.validateForm)
    }

    validateForm() {
        this.setState({
            formValid: this.state.emailValid &&
                this.state.passwordValid &&
                this.state.nameValid &&
                this.state.usernameValid
        })
    }

    handleMessage(msg) {
        this.props.msghandler(msg)
    }

    handleSubmit(event) {
        // alert(this.state)
        event.preventDefault()


        this.handleMessage({
            type: 'info',
            message: 'Loading. Plese Wait...'
        })

        const signupReqBody = {
            name: this.state.name,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }

        const request = signupRequest(signupReqBody)
        this.signup(request)
            .then(response => {
                this.handleMessage({
                    type: 'success',
                    message: 'User registered successfully. Please login'
                })
                this.props.tabhandler('login')
            })
            .catch(error => {
                this.handleMessage({
                    type: 'danger',
                    message: error.message
                })
            })


        this.setState({
            name: '',
            username: '',
            email: '',
            password: '',
            emailValid: false,
            passwordValid: false,
            nameValid: false,
            usernameValid: false,
            formValid: false
        })
    }

    render() {

        return (
            <div className='container'>
                <Form onSubmit={this.handleSubmit} autoComplete='off'>

                    <FormGroup>
                        <Input type='text' id='username' name='username' placeholder='Username'
                            invalid={(this.state.formErrors.username.length > 0)}
                            onChange={this.handleChange}
                            value={this.state.username}
                        />
                        <FormFeedback>{this.state.formErrors.username}</FormFeedback>
                        <Label for='username'>Username</Label>
                    </FormGroup>

                    <FormGroup>
                        <Input type='password' id='password' name='password' placeholder='Password'
                            invalid={(this.state.formErrors.password.length > 0)}
                            onChange={this.handleChange}
                            value={this.state.password}
                        />

                        <FormFeedback>{this.state.formErrors.password}</FormFeedback>
                        <Label for='password'>Password</Label>
                    </FormGroup>


                    <FormGroup>
                        <Input type='text' id='name' name='name' placeholder='Name'
                            invalid={(this.state.formErrors.name.length > 0)}
                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                        <FormFeedback>{this.state.formErrors.name}</FormFeedback>
                        <Label for='name'>Name</Label>
                    </FormGroup>

                    <FormGroup>
                        <Input type='email' id='email' name='email' placeholder='Email'
                            invalid={(this.state.formErrors.email.length > 0)}
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                        <FormFeedback>{this.state.formErrors.email}</FormFeedback>
                        <Label for='email'>Email</Label>
                    </FormGroup>
                    <Button type='submit' color='primary'
                        disabled={!this.state.formValid}>Sign up</Button>
                </Form>
            </div>
        )

    }
}
