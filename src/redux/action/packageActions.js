import * as actionTypes from '../actionTypes'

export const createPackage = payload =>({
    type: actionTypes.CREATE_PACKAGE,
    payload
})

export const udpatePackage = payload => ({
    type: actionTypes.UPDATE_PACKAGE,
    payload
})

export const deletePackage = payload => ({
    type: actionTypes.DELETE_PACKAGE,
    payload
})

export const getPackages = payload => ({
    type: actionTypes.GET_PACKAGES,
    payload
});

export const setPackage = payload => ({
    type: actionTypes.SET_PACKAGES,
    payload
});

export const getPackageById = payload => ({
    type: actionTypes.GET_PACKAGE_BY_ID,
    payload
});