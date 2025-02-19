import * as actionTypes from '../actionTypes';


const initialState = {
    bikes: [],
    bikeDetails: null,
    loading: false,
    error: null,
};

export default function bikeReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_IS_LOADING:
            return { ...state, loading: action.payload };

        case actionTypes.SET_BIKES:
            return { ...state, bikes: action.payload, error: null };

        case actionTypes.SET_BIKE_DETAILS:
            return { ...state, bikeDetails: action.payload, error: null };

        case actionTypes.SET_ERROR:
            return { ...state, error: action.payload };

        default:
            return state;
    }
}


