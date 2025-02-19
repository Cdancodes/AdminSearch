import * as actionTypes from '../actionTypes'

export const createCar = payload =>({
    type: actionTypes.CREATE_CAR,
    payload
})

export const updateCar = payload => ({
    type: actionTypes.UPDATE_CAR,
    payload
})

export const deleteCar = payload => ({
    type: actionTypes.DELETE_CAR,
    payload
})

export const getCars = payload => ({
    type: actionTypes.GET_CARS,
    payload
});

export const setCars = payload => ({
    type: actionTypes.SET_CARS,
    payload
});

export const getCarById = payload => ({
    type: actionTypes.GET_CAR_BY_ID,
    payload
});