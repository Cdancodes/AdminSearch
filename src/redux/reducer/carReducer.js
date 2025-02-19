import * as actionTypes from '../actionTypes';

const initialState = {
    cars: [],
    carDetails: null, 
    loading: false,
    error: null,
};

export default function carReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_IS_LOADING:
            return { ...state, loading: action.payload };

        case actionTypes.SET_CARS:
            return { ...state, cars: action.payload, error: null };

        case actionTypes.SET_CAR_DETAILS:
            return { ...state, carDetails: action.payload, error: null };

        case actionTypes.SET_ERROR:
            return { ...state, error: action.payload };

        default:
            return state;
    }
}
