import React, { Component } from 'react'
import { UserCard } from '../users/UserCard'
import { Row, Col } from 'reactstrap'
import { EditName } from '../users/EditName'
import { EditPassword } from '../users/EditPassword'

export class ProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user:this.props.user
        }

        this.handleUpdateName = this.handleUpdateName.bind(this)
    }
    handleUpdateName(name){
        const newUser=this.state.user
        newUser.name = name
        this.setState({user: newUser})
    }

    render() {
        return (
            <div>
                <h3>Your Profile</h3>
                <Row>
                    <Col md={6} className='d-flex justify-content-center'>
                        <UserCard user={this.state.user} />
                    </Col>

                    <Col className='mt-3 mt-md-0 d-flex flex-column justify-content-around align-items-center'>
                        <div>
                            <div className='mb-1 mt-2'>Edit Name</div>
                            <EditName handleUpdateName={this.handleUpdateName}/>
                        </div>
                        <div>
                            <div className='mb-1 mt-2'>Edit Password</div>
                            <EditPassword />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}