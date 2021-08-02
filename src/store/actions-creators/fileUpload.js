import {  FileActionTypes } from "../../types/file";

export const setProgress = (payload) => {
  return { type: FileActionTypes.SET_PROGRESS, payload };
};
