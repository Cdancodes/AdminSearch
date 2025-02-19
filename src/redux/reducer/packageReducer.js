import * as actionTypes from '../actionTypes';

const initialState = {
    packages: [],
    packageDetails: null, 
    loading: false,
    error: null,
};

export default function packageReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_IS_LOADING:
            return { ...state, loading: action.payload };

        case actionTypes.SET_PACKAGES:
            return { ...state, packages: action.payload, error: null };

        case actionTypes.SET_PACKAGE_DETAILS:
            return { ...state, packageDetails: action.payload, error: null };

        case actionTypes.SET_ERROR:
            return { ...state, error: action.payload };

        default:
            return state;
    }
}
