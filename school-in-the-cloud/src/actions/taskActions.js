import axios from "axios";
import { axiosWithAuth } from "../utils/axiosAuth";

export const FETCH_START = "TASK_FETCH_START";
export const FETCH_SUCCESS = "TASK_FETCH_SUCCESS";
export const FETCH_FAIL = "TASK_FETCH_FAIL";

export const POST_START = "TASK_POST_START";
export const POST_SUCCESS = "TASK_POST_SUCCESS";
export const POST_FAIL = "TASK_POST_FAIL";

export const PUT_START = "TASK_PUT_START";
export const PUT_SUCCESS = "TASK_PUT_SUCCESS";
export const PUT_FAIL = "TASK_PUT_FAIL";

export const DELETE_START = "TASK_DELETE_START"
export const DELETE_SUCCESS = "TASK_DELETE_SUCCESS"
export const DELETE_FAIL = "TASK_DELETE_FAIL"

export const dataFetch = () => dispatch => {
    dispatch({ type: FETCH_START });

    axiosWithAuth().get("https://school-in-the-cloud-bwpt15.herokuapp.com/api/tasks")
    .then(res => {
        dispatch({ type: FETCH_SUCCESS, payload: res.data });
    })
    .catch(err => {
        dispatch({ type: FETCH_FAIL, payload: err.message });
    });
};

export const dataPost = (data, id) => dispatch => {
    dispatch({ type: POST_START });

    axiosWithAuth().post("https://school-in-the-cloud-bwpt15.herokuapp.com/api/tasks", data)
    .then(res => {
        dispatch({ type: POST_SUCCESS, payload: res.data });
        axiosWithAuth().post("https://school-in-the-cloud-bwpt15.herokuapp.com/api/admin", id)
        .then(res => {
            console.log(res);
        }).catch(err => {
            dispatch({ type: POST_FAIL, payload: err.message });
        });
    })
    .catch(err => {
        dispatch({ type: POST_FAIL, payload: err.message });
    });
};

export const dataPut = (id, data) => dispatch => {
    dispatch({ type: PUT_START });

    axiosWithAuth().put("https://school-in-the-cloud-bwpt15.herokuapp.com/api/tasks/" + id, data)
    .then(res => {
        dispatch({ type: PUT_SUCCESS, payload: res.data });
    })
    .catch(err => {
        dispatch({ type: PUT_FAIL, payload: err.message });
    });
};

export const delData = (id) => dispatch => {
    dispatch({ type: DELETE_START });

    axiosWithAuth().delete("https://school-in-the-cloud-bwpt15.herokuapp.com/api/tasks/" + id);
};

export const completeFetch = () => dispatch => {

    axiosWithAuth().get("https://school-in-the-cloud-bwpt15.herokuapp.com/api/admin")
    .then(res => {
        
    })
    .catch(err => {
        
    });
};