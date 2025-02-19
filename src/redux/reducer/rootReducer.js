import { combineReducers } from "redux";
import settings from "./settingReducer";
import bannerReducer from "./bannerReducer";
import carReducer from "./carReducer";
import bikeReducer from "./bikeReducer";
import customerReducer from "./customerReducer";
import packageReducer from "./packageReducer";

const appReducer = combineReducers({
    settings,
    bannerReducer,
    carReducer,
    bikeReducer,
    customerReducer,
    packageReducer
})

export default appReducer;