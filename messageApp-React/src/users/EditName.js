import React, { Component } from 'react'
import { Form, Input, Button, Row, Col } from 'reactstrap'
import { updateNameRequest } from '../utils/Utils'

export class EditName extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            success: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const v = e.target.value
        this.setState({
            value: v,
            success: null
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        const reqBody = { name: this.state.value }
        const request = updateNameRequest(reqBody)

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
                this.props.handleUpdateName(this.state.value)
            })
            .catch(error => this.setState({ success: false }))
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} >
                <Row noGutters>
                    <Col xs={8}>
                        <Input type='text' name='newName' id='newName'
                            value={this.state.value} placeholder='New name'
                            onChange={this.handleChange}
                        />
                    </Col>
                    <Col>
                        <Button type='submit'>ok</Button>
                    </Col>
                    <Col>
                        {this.state.success != null ?
                            this.state.success ?
                                <i style={{ color: 'green' }} className='fas fa-check p-2'></i>
                                : <i style={{ color: 'red' }} className='fas fa-times p-2'></i>
                            : null
                        }
                    </Col>
                </Row>
            </Form>
        )
    }
}