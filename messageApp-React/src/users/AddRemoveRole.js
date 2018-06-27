import React, { Component } from 'react'
import { Input, Button } from 'reactstrap'
import { addRoleRequest, removeRoleRequest } from '../utils/Utils'


export class AddRemoveRole extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRole: 'ROLE_ADMIN',
            selectedRoleId: 2
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    transformRole(role) {
        switch (role.toUpperCase()) {
            case 'ROLE_ADMIN':
                return 2
                break
            case 'ROLE_GOD':
                return 3
                break
            default:
                return 2
                break
        }
    }

    handleChange(e) {
        const sel = 'ROLE_' + e.target.value.toUpperCase()

        this.setState({
            selectedRole: sel,
            selectedRoleId: this.transformRole(sel)
        })
    }

    handleSubmit() {
        const requestBody = {
            userId: this.props.user.id,
            roleId: this.state.selectedRoleId
        }
        const request = (!this.props.user.roles.includes(this.state.selectedRole)) ? addRoleRequest(requestBody) : removeRoleRequest(requestBody)


        fetch(request.url, request)
            .then(
                result => {
                    const newRoles = this.props.user.roles.slice()

                    const index = newRoles.indexOf(this.state.selectedRole)
                    if (index == -1) {
                        newRoles.push(this.state.selectedRole)
                    }
                    else {
                        newRoles.splice(index, 1)
                    }
                    const user = {
                        username: this.props.user.username,
                        name: this.props.user.name,
                        email: this.props.user.email,
                        id: this.props.user.id,
                        roles: newRoles
                    }
                    this.props.onEditRole(user)
                },
                error => alert(error.message)
            )

    }

    drawButton() {
        if (!this.props.user.roles.includes(this.state.selectedRole)) {
            return <Button color='success' onClick={this.handleSubmit}>Add</Button>
        } else {
            return <Button color='danger' onClick={this.handleSubmit}>Remove</Button>
        }

    }

    render() {
        return (
            <div className='d-flex'>
                <Input className='mr-2' onChange={this.handleChange} type='select' name='selectRole' id='selectRole'>
                    <option >Admin</option>
                    <option >God</option>
                </Input>
                {
                    this.drawButton()
                }
            </div>
        )
    }
}