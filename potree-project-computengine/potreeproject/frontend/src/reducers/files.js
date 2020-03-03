import {
  GET_FILES,
  DELETE_FILE,
  POST_FILE,
  CONVERT_FILE
} from "../actions/types.js";

const initialState = {
  files: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FILES:
      return {
        ...state,
        files: action.payload
      };
    case DELETE_FILE:
      return {
        ...state,
        files: state.files.filter(file => file.file_id !== action.payload)
      };

    case POST_FILE:
      return {
        ...state,
        files: [...state.files, action.payload]
      };
    case CONVERT_FILE:
      return {
        ...state,
        files: [...state.files]
      };
    default:
      return state;
  }
}
