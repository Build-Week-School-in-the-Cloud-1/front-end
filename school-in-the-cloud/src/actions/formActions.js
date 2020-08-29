import axios from "axios";

export const POST_START = "FETCH_START";
export const POST_SUCCESS = "FETCH_SUCCESS";
export const POST_FAIL = "FETCH_FAIL";

export const formPost = (type, form) => dispatch => {
    dispatch({ type: POST_START });

    axios.post("https://school-in-the-cloud-bwpt15.herokuapp.com/api/" + type, form)
    .then(res => {
        console.log("action log",res);
        dispatch({ type: POST_SUCCESS, payload: res.data });
    })
    .catch(err => {
        console.log(err);
        dispatch({ type: POST_FAIL, payload: err.message });
    });
};