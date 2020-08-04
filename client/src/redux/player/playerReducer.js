import {PLAYER_PLAY} from "../types";

const initialState = {
  playing: false,
  url: null,
}

export const playerReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case PLAYER_PLAY:
      return payload
    default:
      return state
  }
}
