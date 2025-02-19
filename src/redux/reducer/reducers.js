import { GET_CONTACT_REQUESTS } from "../actionTypes";

const initialState = { loading: false, success: false, error: null };

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACT_REQUESTS:
      return { ...state, loading: true };
    default:
      return state;
  }
};