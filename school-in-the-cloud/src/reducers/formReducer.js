import {
    POST_START,
    POST_SUCCESS,
    POST_FAIL
} from "../actions/formActions";

const initialState = {
        userData: {
            token: "",
            user: {
                id: "",
                fname: "test",
                lname: "",
                email: "",
                username: "",
                password: "",
                country: "",
                role: "",
                bio: "",
                volunteer_time: "",
                student_time: "",
            }
        },
        isPosting: false,
        error: ""
};

const formReducer = (state = initialState, action) => {
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
                userData: {
                    token: action.payload.token,
                    user: action.payload.user
                }
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

export default formReducer;