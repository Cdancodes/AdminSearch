import * as actionTypes from '../actionTypes'

export  const loginRequest = payload =>({
    type: actionTypes.LOGIN_REQUEST,
    payload
})