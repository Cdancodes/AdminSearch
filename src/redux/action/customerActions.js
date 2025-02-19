import * as actionTypes from '../actionTypes'

export const createCustomer = payload =>({
    type: actionTypes.CREATE_CUSTOMER,
    payload
})

export const updateCustomer = payload => ({
    type: actionTypes.UPDATE_CUSTOMER,
    payload
})

export const deleteCustomer = payload => ({
    type: actionTypes.DELETE_CUSTOMER,
    payload
})

export const getCustomers = payload => ({
    type: actionTypes.GET_CUSTOMERS,
    payload
});

export const setCustomers = payload => ({
    type: actionTypes.SET_CUSTOMERS,
    payload
});

export const getCustomerById = payload => ({
    type: actionTypes.GET_CUSTOMER_BY_ID,
    payload
})