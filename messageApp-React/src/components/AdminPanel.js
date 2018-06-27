import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { UsersListDetails } from '../users/UsersListDetails'
import { AddRemoveRole } from '../users/AddRemoveRole'
import { MessageBoard } from '../messages/MessageBoard'
import { UserCard } from '../users/UserCard'
import { Row, Col, Button } from 'reactstrap'
import { EditName } from '../users/EditName'
import { EditPassword } from '../users/EditPassword'

export class AdminPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userEditing: null,
            showMsg: false
        }
        this.selectUser = this.selectUser.bind(this)
        this.toggleMessages = this.toggleMessages.bind(this)
        this.onEditRole = this.onEditRole.bind(this)
        this.closeUserCard = this.closeUserCard.bind(this)
        this.handleUpdateName = this.handleUpdateName.bind(this)
        this.handlEscape = this.handlEscape.bind(this)
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handlEscape, false)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handlEscape, false)
    }

    handlEscape(e) {
        if (e.keyCode == 27) {
            this.closeUserCard()
        }
    }

    selectUser(user) {
        this.setState({
            userEditing: user,
            showMsg: false
        })
    }

    unusedRoles(used) {
        const allRoles = ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_GOD']
        const unused = allRoles.filter((item) => {
            return !used.includes(item)
        })
        return unused.map(role => <li key={role}>{role.substring(5)}</li>)
    }
    toggleMessages() {
        this.setState({
            showMsg: !this.state.showMsg
        })
    }
    onEditRole(user) {
        this.setState({ userEditing: user })
    }

    closeUserCard() {
        this.setState({ userEditing: null })
    }

    handleUpdateName(name) {
        const newUser = this.state.userEditing
        newUser.name = name
        this.setState({ userEditing: newUser })
    }

    render() {

        if (this.props.user.roles.indexOf('ROLE_ADMIN') != -1 ||
            this.props.user.roles.indexOf('ROLE_GOD') != -1) {
            return (
                <div>
                    <h3>Admin Panel</h3>
                    {
                        this.state.userEditing == null ?
                            <UsersListDetails onSelect={this.selectUser} /> :
                            <div>
                                <div className='edit-close' onClick={this.closeUserCard}>
                                    <span className='point'>Close <i className='fas fa-times'></i></span>
                                </div>
                                <Row>
                                    <Col md={6} className='d-flex justify-content-center'>
                                        <UserCard user={this.state.userEditing} />
                                    </Col>
                                    <Col className='mt-3 mt-md-0 d-flex flex-column justify-content-around'>
                                        {this.state.userEditing.username !== this.props.user.username ?
                                            <div>
                                                <div className='mb-1'>Add or Remove roles</div>
                                                <AddRemoveRole user={this.state.userEditing} onEditRole={this.onEditRole} />
                                            </div>
                                            : null}

                                        {this.state.userEditing.username == this.props.user.username ?
                                            <div>
                                                <div>
                                                    <div className='mb-1 mt-2'>Edit Name</div>
                                                    <EditName handleUpdateName={this.handleUpdateName} />
                                                </div>
                                                <div>
                                                    <div className='mb-1 mt-2'>Edit Password</div>
                                                    <EditPassword />
                                                </div>
                                            </div>
                                            : null}
                                        <Button className='my-2' onClick={this.toggleMessages} outline>
                                            {this.state.showMsg ? 'hide' : 'show'} {this.state.userEditing.username}'s Messages</Button>
                                    </Col>
                                </Row>
                                {this.state.showMsg ?
                                    <div>
                                        <hr />
                                        <MessageBoard username={this.state.userEditing.username}
                                            roles={this.props.user.roles} />
                                    </div>
                                    : null
                                }
                            </div>
                    }
                </div>
            )
        } else {
            return <Redirect to='/' />
        }
    }

}
