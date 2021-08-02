import * as PlayerActionCreators from "./player";
import * as fileUploadActionCreators from "./fileUpload";

const allActionCreators = {
  ...PlayerActionCreators,
  ...fileUploadActionCreators,
};
export default allActionCreators;
