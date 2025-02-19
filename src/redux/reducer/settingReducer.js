import * as actionTypes from '../actionTypes';

const initialState = {
    isLoading: false,
}

const settings = (state = initialState, actions)=>{
    const {type, payload} = actions;
    switch(type){
        case actionTypes.SET_IS_LOADING:{
            return{
                ...state,
                isLoading: payload
            }
        }
        default: {
            return state
        }
    }
}

export default settings;