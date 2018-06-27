import { API_BASE_URL } from '../config/config'

export const logout = () => {
    localStorage.getItem('accessToken') ?
        localStorage.removeItem('accessToken') : null
}

export const getAllUsersRequest = () => {
    const request = ({
        url: API_BASE_URL + 'users',
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        })
    })
    return request
}

export const getMessagesRequest = (msgType, username) => {
    // const msgType = this.props.msgType
    const request = ({
        url: API_BASE_URL + 'message/' + msgType + 'messages' + (username == null ? '' : '/' + username),
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        })
    })

    return request
}

export const deleteMessageRequest = (id) => {
    const request = ({
        url: API_BASE_URL + 'message/deletemessage/' + id,
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        })
    })

    return request
}

export const sendMessageRequest = (reqBody) => {
    const request = {
        url: API_BASE_URL + 'message/send',
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }),
        body: JSON.stringify(reqBody)
    }
    return request
}

export const loginRequest = (reqBody) => {
    const request = ({
        url: API_BASE_URL + 'auth/signin',
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(reqBody)
    })
    return request
}

export const editMsgRequest = (reqBody) => {
    const request = {
        url: API_BASE_URL + 'message/updatemessage',
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }),
        body: JSON.stringify(reqBody)
    }
    return request
}

export const signupRequest = (reqBody) => {
    const request = ({
        url: API_BASE_URL + 'auth/signup',
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(reqBody)
    })
    return request
}

getAllUsersDetailsRequest

export const getAllUsersDetailsRequest = () => {
    const request = ({
        url: API_BASE_URL + 'users/rolelist',
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        })
    })
    return request
}

export const addRoleRequest = (reqBody) => {
    const request = ({
        url: API_BASE_URL + 'users/addrole',
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }),
        body: JSON.stringify(reqBody)
    })
    return request
}

export const removeRoleRequest = (reqBody) => {
    const request = ({
        url: API_BASE_URL + 'users/deleterole',
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }),
        body: JSON.stringify(reqBody)
    })
    return request
}

export const updateNameRequest = (reqBody) => {
    const request = ({
        url: API_BASE_URL + 'users/updatename',
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }),
        body: JSON.stringify(reqBody)
    })
    return request
}

export const updatePasswordRequest = (reqBody) => {
    const request = ({
        url: API_BASE_URL + 'users/updatepassword',
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }),
        body: JSON.stringify(reqBody)
    })
    return request
}

export const getCurrentUserRequest = () => {
    const request = ({
        url: API_BASE_URL + 'users/about/me',
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        })
    })
    return request
}
