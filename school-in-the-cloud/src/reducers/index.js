import { combineReducers } from "redux";
import formReducer from "./formReducer";
import taskReducer from "./taskReducer";

export default combineReducers({
    formReducer,
    taskReducer
});