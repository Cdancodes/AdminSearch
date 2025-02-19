import * as actionTypes from '../actionTypes';

const initialState = {
  customers: [],
  customerDetails: null,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

export default function customerReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_IS_LOADING:
      return { ...state, loading: action.payload };

    case actionTypes.SET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload.customers,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        error: null,
      };
    
    case actionTypes.SET_CUSTOMER_DETAILS:
      return { ...state, customerDetails: action.payload, error: null };

    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
}
