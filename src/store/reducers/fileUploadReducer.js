import { FileActionTypes } from "../../types/file";

const initialState = {
  progress: null,
  done: false
};

export const fileUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case FileActionTypes.SET_PROGRESS:
      return { ...state, progress: action.payload };
    default:
      return state;
  }
};
