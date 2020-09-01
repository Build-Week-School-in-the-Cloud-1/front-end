import {
    FETCH_START,
    FETCH_SUCCESS,
    FETCH_FAIL,
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
        results: [],
        isPosting: false,
        isFetching: false,
        error: ""
};

const formReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_START:
            return{
                ...state,
                isFetching: true
            }
        case FETCH_SUCCESS:
            return{
                ...state,
                isFetching: false,
                results: action.payload
            }
        case FETCH_FAIL:
            return{
                ...state,
                isFetching: false,
                error: action.payload
            }
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