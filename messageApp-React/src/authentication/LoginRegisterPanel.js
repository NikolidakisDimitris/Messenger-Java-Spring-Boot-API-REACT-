import React, { Component } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Alert } from 'reactstrap'
import { Login } from './Login'
import { SignUp } from './SignUp'


export class LoginRegisterPanel extends Component {
    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this)
        this.state = {
            activeTab: 'login',
            alert: {
                type: '',
                message: ''
            }
        }

        this.handleAlert = this.handleAlert.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleLogin(){
        this.props.handleLogin()
    }

    handleAlert(msg){
        this.setState({
            alert:{
                type: msg.type,
                message: msg.message
            }
        })
    }
    
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            })
        }
    }
    render() {
        return (

            <div className='row justify-content-center'>
                <div className='col-10 col-sm-7 col-md-5 col-lg-4 loginPanel'>                
                    {this.state.alert.message.length > 0 ?
                        <Alert color={this.state.alert.type}>
                            {this.state.alert.message}
                        </Alert>: null}
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={this.state.activeTab === 'login' ? 'active' : null}
                                onClick={() => { this.toggle('login') }}
                            >
                                Login
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={this.state.activeTab === 'register' ? 'active' : null}
                                onClick={() => { this.toggle('register') }}
                            >
                                Register
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId='login'>
                            <Login msghandler={this.handleAlert} handleLogin={this.handleLogin}/>
                        </TabPane>
                        <TabPane tabId='register'>
                            <SignUp msghandler={this.handleAlert}
                                    tabhandler={this.toggle}/>
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        )
    }
}
