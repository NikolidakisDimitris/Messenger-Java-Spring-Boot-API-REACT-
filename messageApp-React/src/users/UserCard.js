import React, { Component } from 'react'

export class UserCard extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const roles =this.props.user.roles
        return (
            <div className='userCard' >
                <div className='userCard__body'>
                <img className='userCard__avatar' src='./assets/img/avatar.jpg' alt='Card image cap' />
                    <div className='card-title'><h5>{this.props.user.username}</h5></div>
                    <div>{this.props.user.name}</div>
                    <div> <a href={'mailto:' + this.props.user.email}>{this.props.user.email}</a></div>

                    <div>Roles : {roles.map(role =>
                                (role==roles[roles.length -1])?
                                    <span key={role}>{role.substring(5)}</span>:
                                <span key={role}>{role.substring(5)+' and '}</span>
                            )}</div>
                </div>
            </div>
        )
    }
}