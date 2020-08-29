import { combineReducers } from "redux";
import formReducer from "./formReducer";
import userReducer from "./userReducer";

export default combineReducers({
    formReducer,
    userReducer
});