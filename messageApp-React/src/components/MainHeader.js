import React, { Component } from 'react'

export class MainHeader extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <header className='d-flex justify-content-between align-items-center mainHeader'>
                <div className='logo'>
                    <i className='fas fa-comment'></i>
                </div >
                <h4>Hello {this.props.user.username}</h4>
                <div className='point logout' onClick={this.props.handleLogout} ><span>Log out</span><i className='fas fa-sign-out-alt'></i></div>
            </header >
        )
    }
}