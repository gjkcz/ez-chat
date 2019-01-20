import axios from "axios";
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get("/api/users/me").then((res) => {
dispatch({
    type: GET_PROFILE,
    payload: res
})
    }).catch((e) => {
        dispatch({
            type: GET_PROFILE,
            payload: null
        })
    });
}



export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}