import { PlayerActionTypes } from "../../types/player";

const initialState = {
  currentTime: 0,
  duration: 0,
  volume: 50,
  active: null,
  pause: true,
};
export const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case PlayerActionTypes.PAUSE:
      console.log("PAUSE");
      return { ...state, pause: true };
    case PlayerActionTypes.PLAY:
      console.log("PLAY");
      return { ...state, pause: false };
    case PlayerActionTypes.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload };
    case PlayerActionTypes.SET_VOLUME:
      return { ...state, volume: action.payload };
    case PlayerActionTypes.SET_DURATION:
      return { ...state, duration: action.payload };
    case PlayerActionTypes.SET_ACTIVE:
      console.log("SET_ACTIVE");
      return { ...state, active: action.payload, duration: 0, currentTime: 0 };
    default:
      return state;
  }
};
