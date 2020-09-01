import {
    FETCH_START,
    FETCH_SUCCESS,
    FETCH_FAIL,
    POST_START,
    POST_SUCCESS,
    POST_FAIL
} from "../actions/taskActions";

const initialState = {
    tasks: [{
        id: "",
        task_name: "",
        task_description: "",
        completion: "",  
    }],
    isFetching: false,
    isPosting: false,
    error: ""
};

function taskReducer(state = initialState, action){
    switch(action.type){
        case FETCH_START:
            return{
                ...state,
                isFetching: true
            };
        case FETCH_SUCCESS:
            return{
                ...state,
                isFetching: false,
                tasks: action.payload
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
            };
        case POST_SUCCESS:
            return{
                ...state,
                isPosting: false,
                tasks: [
                    ...state.tasks,
                    action.payload
                ]
            };
        case POST_FAIL:
            return{
                ...state,
                isPosting: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export default taskReducer;