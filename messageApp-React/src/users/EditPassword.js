import React, { Component } from 'react'
import { Form, Input, Button, Row, Col } from 'reactstrap'
import { updatePasswordRequest } from '../utils/Utils'

export class EditPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newPassword: '',
            verifyPassword: '',
            validPassword: null,
            verified: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const name = e.target.name
        const value = e.target.value

        this.setState({ [name]: value },
            () => this.validate())
        this.setState({ success: null })
    }
    validate() {
        if (this.state.newPassword.length >= 6) {
            this.setState({ validPassword: true })
        } else {
            this.state.newPassword.length == 0 ?
                this.setState({ validPassword: null }) :
                this.setState({ validPassword: false })

        }
        if (this.state.newPassword == this.state.verifyPassword) {
            this.setState({ verified: true })
        }
        else {
            this.state.newPassword.length == 0 ?
                this.setState({ varified: null }) :
                this.setState({ verified: false })
        }
    }

    handleSubmit(e) {
        e.preventDefault()

        const reqBody = { password: this.state.newPassword }
        const request = updatePasswordRequest(reqBody)

        fetch(request.url, request)
            .then(response =>
                response.json().then(json => {
                    if (!response.ok) {
                        return Promise.reject(json)
                    }
                    return json
                })
            )
            .then(response => {
                this.setState({ success: true })
            })
            .catch(error => this.setState({ success: false }))
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} >
                <Row noGutters>
                    <Col xs={8}>
                        <Input className='my-1' type='password' name='newPassword' id='newPassword'
                            value={this.state.newPassword} placeholder='New password'
                            onChange={this.handleChange}
                            invalid={this.state.validPassword != null ? !
                                this.state.validPassword : false}

                        />
                        <Input className='my-1' type='password' name='verifyPassword' id='verifyPassword'
                            value={this.state.verifyPassword} placeholder='Verify password'
                            onChange={this.handleChange}
                            invalid={this.state.verified != null ? !
                                this.state.verified : false}

                        />
                    </Col>
                    <Col className='d-flex align-items-end'>
                        <Button className='my-1' type='submit'
                        disabled={!this.state.verified || !this.state.validPassword}
                        >
                            ok
                        </Button>
                    </Col>
                    <Col className='d-flex align-items-end'>
                        <div className='my-1'>
                            {this.state.success != null ?
                                this.state.success ?
                                    <i style={{ color: 'green' }} className='fas fa-check p-2'></i>
                                    : <i style={{ color: 'red' }} className='fas fa-times p-2'></i>
                                : null
                            }
                        </div>
                    </Col>
                </Row>
            </Form>
        )
    }
}