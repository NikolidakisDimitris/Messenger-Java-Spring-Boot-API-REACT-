import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import { logout, getCurrentUserRequest } from '../utils/Utils'
import { LoginRegisterPanel } from '../authentication/LoginRegisterPanel'

import { MainHeader } from './MainHeader'
import { Menu } from './Menu'

import { AboutPage } from './AboutPage'
import { YourMessagesPage } from './YourMessagesPage'
import { SendMessagePage } from '../messages/SendMessagePage'
import { ProfilePage } from './ProfilePage'
import { AdminPanel } from './AdminPanel'



export class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logedUser: {
                name: null,
                username: null,
                email: null,
                roles: []
            },
            error: null,
            isLoading: false,
            showSend: false
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }
    componentDidMount() {
        if (localStorage.getItem('accessToken')) {
            this.setState({ isLoading: true })
            this.handleLogin()
        }
    }

    getCurrentUser() {
        const request = getCurrentUserRequest()

        fetch(request.url, request)
            .then(response =>
                response.json().then(json => {
                    if (!response.ok) {
                        return Promise.reject(json)
                    }
                    return json
                })
            )
            .then(
                (result) => {
                    this.setState({
                        logedUser: {
                            name: result.name,
                            username: result.username,
                            email: result.email,
                            roles: result.roles
                        },
                        isLoading: false
                    })
                })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    error
                })
            })
    }

    handleLogin() {
        this.getCurrentUser()
    }

    handleLogout() {
        logout()

        this.setState({
            logedUser: {
                username: null,
                name: null,
                email: null,
                roles: []
            }
        })
    }



    render() {
        if (this.state.error) {
            return (
                <div className='container'>
                    <div className='appNotLoading'>
                        <h3> Error </h3>
                        {this.state.error.message}
                    </div>
                </div>
            )
        }
        if (this.state.isLoading) {
            return (
                <div className='container'>
                    <div className='appNotLoading'>
                        loading...
                        </div>
                </div>
            )
        } else if (this.state.logedUser.username === null) {
            return (<LoginRegisterPanel handleLogin={this.handleLogin} />)
        } else {
            return (
                <div>
                    <div className='container '>
                        <MainHeader user={this.state.logedUser}
                            handleLogout={this.handleLogout} />
                        <Row id='layoutBody' className='no-gutters'>
                            <Col sm={3}>
                                <Menu user={this.state.logedUser} />
                            </Col>
                            <Col sm={9}>
                                <div id='mainContent'>
                                    {
                                        this.props.location.pathname === '/' ?
                                            <Redirect to='/messages' /> :
                                            (this.props.location.pathname === '/messages') ?
                                                <YourMessagesPage roles={this.state.logedUser.roles} />
                                                :
                                                this.props.location.pathname === '/sendmsg' ?
                                                    <SendMessagePage />
                                                    :
                                                    (this.props.location.pathname === '/profile') ?
                                                        <ProfilePage user={this.state.logedUser} />
                                                        :
                                                        (this.props.location.pathname === '/adminpanel') ?
                                                            <AdminPanel user={this.state.logedUser} /> :
                                                            this.props.location.pathname === '/about' ?
                                                                <AboutPage user={this.state.logedUser} />
                                                                :
                                                                null
                                    }
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            )
        }
    }

}