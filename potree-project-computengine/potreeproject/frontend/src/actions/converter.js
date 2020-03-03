import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import {
  POST_FILE,
  CONVERT_FILE,
  GET_CONVERTED,
  OPEN_3D_MODEL,
  CONVERT_ERR
} from "./types";
import { tokenConfig } from "./auth";
import { string } from "prop-types";

export const getConvertedFiles = () => (dispatch, getState) => {
  axios
    .get("/api/convertedFiles/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_CONVERTED,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const convertFile = id => (dispatch, getState) => {
  axios
    .get(`/api/files/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(
        createMessage({
          convertedFile: "File converted"
        })
      );
      dispatch({
        type: CONVERT_FILE,
        payload: id
      });
      axios
        .get("/api/convertedFiles/", tokenConfig(getState))
        .then(res => {
          dispatch({
            type: GET_CONVERTED,
            payload: res.data
          });
        })
        .catch(err =>
          dispatch(returnErrors(err.response.data, err.response.status))
        );
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const open3DModel = id => (dispatch, getState) => {
  axios
    .get(`/api/potree/${id}`, tokenConfig(getState))
    .then(res => {
      console.log("HI AGAIN!: ", id);
      console.log(res.config);

      dispatch({
        type: OPEN_3D_MODEL,
        payload: res.config.url
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getSpecific = () => (dispatch, getState) => {
  var path = "";
  axios

    .get("/api/potree/14", tokenConfig(getState))
    .then(res => {
      console.log(res.config.url);
      path = JSON.parse(res.config.url);
    })
    .catch(err => dispatch(returnErrors(err.res.data, err.res.status)));
  return path;
};

export const redirectPotree = () => {
  if (this.state.redirect) {
    return <Redirect to="/potree" />;
  }
};
