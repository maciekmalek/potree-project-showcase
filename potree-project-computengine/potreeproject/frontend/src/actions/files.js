import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { GET_FILES, DELETE_FILE, POST_FILE, DELETE_CONVERTED } from "./types";
import { tokenConfig } from "./auth";

//GET FILES
export const getFiles = () => (dispatch, getState) => {
  axios
    .get("/api/files/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_FILES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//DELETE FILE

export const deleteFile = id => (dispatch, getState) => {
  axios
    .delete(`/api/files/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(
        createMessage({
          deletedFile: "File deleted"
        })
      );
      dispatch({
        type: DELETE_FILE,
        payload: id
      });
    })
    .catch(err => console.log(err));
};
export const deleteConvertedFile = id => (dispatch, getState) => {
  axios
    .delete(`/api/convertedFiles/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(
        createMessage({
          deletedConvertedFile: "File deleted"
        })
      );
      dispatch({
        type: DELETE_CONVERTED,
        payload: id
      });
    })
    .catch(err => console.log(err));
};
// CONVERT FILE

// ADD FILE
export const postFile = newFile => (dispatch, getState) => {
  axios
    .post("api/files/", newFile, tokenConfig(getState))

    .then(res => {
      dispatch(
        createMessage({
          addedFile: "File uploaded"
        })
      );
      dispatch({
        type: POST_FILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
