import { playerReducer } from "./playerReducer";
import { combineReducers } from "redux";
import { trackReducer } from "./trackReducer";
import { fileUploadReducer } from "./fileUploadReducer";

export const rootReducer = combineReducers({
  player: playerReducer,
  track: trackReducer,
  fileUpload: fileUploadReducer,
});
