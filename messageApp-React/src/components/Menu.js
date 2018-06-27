import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


export class Menu extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id='sidebar'>
                <div id='menu' className='d-flex flex-sm-column justify-content-around justify-content-sm-start'>
                    <NavLink to='/messages' activeClassName='selected'>
                        <div className='navItem'>
                            <span className='d-md-block'>Messages</span>
                            <i className='fas fa-envelope'></i>
                        </div>
                    </NavLink>
                    <NavLink to='/sendmsg' activeClassName='selected'>
                        <div className='navItem'>
                            <span className='d-md-block'>Send Message</span>
                            <i className='fab fa-telegram-plane'></i>
                        </div>
                    </NavLink>
                    <NavLink to='/profile' activeClassName='selected'>
                        <div className='navItem'>
                            <span className='d-md-block'>Your profile</span>
                            <i className='fas fa-user'></i>
                        </div>
                    </NavLink>
                    {
                        this.props.user.roles.includes('ROLE_ADMIN') || this.props.user.roles.includes('ROLE_GOD') ?
                            <NavLink to='/adminpanel' activeClassName='selected'>
                                <div className='navItem'>
                                    <span className='d-md-block'>Admin panel</span>
                                    <i className='fas fa-wrench'></i>
                                </div>
                            </NavLink> : null
                    }
                    <NavLink to='/about' activeClassName='selected' >
                        <div className='navItem'>
                            <span className='d-md-block'>About</span>
                            <i className='fas fa-info'></i>
                        </div>
                    </NavLink>
                </div>
            </div>
        )
    }

}