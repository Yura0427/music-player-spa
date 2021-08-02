import { firestore } from "../../firebase";
import {  TrackActionTypes } from "../../types/track";

export const fetchTracks = () => {
  return async (dispatch) => {
    try {
      const data = [];
      await firestore
        .collection("trackListDemo")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), _id: doc.id });
          });
        });
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: data });
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: "FETCH TRACKS ERROR ",
      });
    }
  };
};
