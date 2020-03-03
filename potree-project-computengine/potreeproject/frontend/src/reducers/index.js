import { combineReducers } from "redux";
import files from "./files";
import auth from "./auth";
import errors from "./errors";
import messages from "./messages";
import convertedFiles from "./convertedFiles";

export default combineReducers({
  files,
  errors,
  messages,
  auth,
  convertedFiles
});
