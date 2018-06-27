import React, { Component } from 'react'
import { getAllUsersDetailsRequest } from '../utils/Utils'
import { FilterUserList } from './FilterUserList'
import { Alert } from 'reactstrap'

export class UsersListDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            filtered: [],
            selectedUser: null,
            error: null
        }
        this.handleClick = this.handleClick.bind(this)
        this.filterHandler = this.filterHandler.bind(this)
    }

    componentDidMount() {
        const request = getAllUsersDetailsRequest()

        fetch(request.url, request)
            .then(res => res.json()
                .then(json => {
                    if (!res.ok) {
                        return Promise.reject(json)
                    }
                    return json
                }))
            .then(result =>
                this.setState({
                    users: result,
                    filtered: result
                })
            )
            .catch(error =>
                this.setState({
                    error
                })
            )
    }

    handleClick(e) {
        const id = e.target.id
        const index = this.state.users.indexOf(this.state.users.find(user => user.id == id))
        const selected = this.state.users[index]
        this.setState({
            selectedUser: selected,
            filtered: [selected]
        })
        //return user
        this.props.onSelect(selected)
    }

    filterHandler(list) {
        this.setState({
            filtered: list,
            selectedUser: null
        })
    }

    render() {
        return (
            <div>
                Select a User
                <FilterUserList users={this.state.users}
                    filterHandler={this.filterHandler}
                    selected={this.state.selectedUser}
                />
                <div className='usersList'>
                    {this.state.error ?
                        <Alert color='danger'>{this.state.error.message}</Alert> :
                        this.state.filtered.map(user =>
                            <div key={user.id} id={user.id} className='usersList-block' onClick={this.handleClick}> {user.username} </div>
                        )}
                </div>
            </div>
        )
    }

}