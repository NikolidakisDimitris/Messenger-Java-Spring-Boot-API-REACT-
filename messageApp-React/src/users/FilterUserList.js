import React, { Component } from 'react'
import { Input } from 'reactstrap'

export class FilterUserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value:'',
        }

        this.handleChange = this.handleChange.bind(this)
    }

    
    handleChange(e){
        const value = e.target.value
        this.setState({
            value: value
        })

        const filtered = this.filterUsers(value)
        this.props.filterHandler(filtered)

        //return List of users
    }

    filterUsers(name) {
        const filtered = this.props.users.filter(
            (user) => user.username.toLowerCase().indexOf(name.toLowerCase()) !== -1
        )
        return filtered
    }

    render(){
        return(
            <Input value={this.props.selected!=null?this.props.selected.username:this.state.value} onChange={this.handleChange} placeholder='Search a username' className='filterUserList'/>
        )
    }
}