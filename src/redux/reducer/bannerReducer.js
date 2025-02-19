import * as actionTypes from '../actionTypes';


const initialState = {
    banners: [],
    loading: false,
    error: null,
};

export default function bannerReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_IS_LOADING:
            return { ...state, loading: action.payload };

        case actionTypes.SET_BANNERS:
            return { ...state, banners: action.payload, error: null };

        case actionTypes.SET_ERROR:
            return { ...state, error: action.payload };

        default:
            return state;
    }
}


