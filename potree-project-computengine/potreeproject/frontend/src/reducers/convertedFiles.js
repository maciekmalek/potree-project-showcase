import {
  GET_CONVERTED,
  OPEN_3D_MODEL,
  DELETE_CONVERTED
} from "../actions/types.js";

const initialState = {
  convertedFiles: [],
  ourURL: ""
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CONVERTED:
      return {
        ...state,
        convertedFiles: action.payload
      };
    case DELETE_CONVERTED:
      return {
        ...state,
        convertedFiles: state.convertedFiles.filter(
          converted_file => converted_file.file_id !== action.payload
        )
      };
    case OPEN_3D_MODEL:
      return {
        ...state,
        ourURL: action.payload
      };

    default:
      return state;
  }
}
