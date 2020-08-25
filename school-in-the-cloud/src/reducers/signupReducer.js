import {
    POST_START,
    POST_SUCCESS,
    POST_FAIL
} from "../actions/signupActions";

const initialState = {
        token: "",
        isPosting: false,
        error: ""
};

const signupReducer = (state = initialState, action) => {
    switch(action.type){
        case POST_START:
            return{
                ...state,
                isPosting: true
            }
        case POST_SUCCESS:
            return{
                ...state,
                isPosting: false,
                token: action.payload
            }
        case POST_FAIL:
            return{
                ...state,
                isPosting: false,
                error: action.payload
            }
        default:
            return state;
    };
};