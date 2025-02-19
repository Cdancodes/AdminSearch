import * as actionTypes from '../actionTypes'

export const createBike = payload =>({
    type: actionTypes.CREATE_BIKE,
    payload
})

export const updateBike = payload => ({
    type: actionTypes.UPDATE_BIKE,
    payload
})

export const deleteBike = payload => ({
    type: actionTypes.DELETE_BIKE,
    payload
})

export const getBikes = payload => ({
    type: actionTypes.GET_BIKES,
    payload
});

export const setBikes = payload => ({
    type: actionTypes.SET_BIKES,
    payload
});

export const getBikeById = payload => ({
    type: actionTypes.GET_BIKE_BY_ID,
    payload
});