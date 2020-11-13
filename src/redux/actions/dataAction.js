import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
} from "../types";
import axios from "axios";

//getting the screams
export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/screams")
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_SCREAMS,
        payload: [],
      });
    });
};

//liking the scream
export const likeScream = (screamId) => (dispatch) => {
  axios
    .get(`/screams/${screamId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.code));
};

//unlike the scream
export const unlikeScream = (screamId) => (dispatch) => {
  axios
    .get(`/screams/${screamId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.code));
};
