import axios from "axios";

export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAIL = "FETCH_FAIL";

export const POST_START = "POST_START";
export const POST_SUCCESS = "POST_SUCCESS";
export const POST_FAIL = "POST_FAIL";

export const dataFetch = () => dispatch => {
    dispatch({ type: FETCH_START });

    axios.get("https://school-in-the-cloud-bwpt15.herokuapp.com/api/admin/users")
    .then(res => {
        console.log("fetch log", res);
        dispatch({ type: FETCH_SUCCESS, payload: res.data });
    })
    .catch(err => {
        dispatch({ type: FETCH_FAIL, payload: err.message });
    });
};

export const formPost = (type, form) => dispatch => {
    dispatch({ type: POST_START });

    axios.post("https://school-in-the-cloud-bwpt15.herokuapp.com/api/" + type, form)
    .then(res => {
        console.log("action log", res);
        window.localStorage.setItem("token", res.data.token);
        dispatch({ type: POST_SUCCESS, payload: res.data });
    })
    .catch(err => {
        console.log(err);
        dispatch({ type: POST_FAIL, payload: err.message });
    });
};