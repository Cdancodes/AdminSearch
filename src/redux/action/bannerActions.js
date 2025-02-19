import * as actionTypes from '../actionTypes'

export const createBanner = payload =>({
    type: actionTypes.CREATE_BANNER,
    payload
})

export const updateBanner = payload => ({
    type: actionTypes.UPDATE_BANNER,
    payload
})

export const deleteBanner = payload => ({
    type: actionTypes.DELETE_BANNER,
    payload
})

export const getBanners = payload => ({
    type: actionTypes.GET_BANEERS,
    payload
});

export const setBanners = payload => ({
    type: actionTypes.SET_BANNERS,
    payload
});