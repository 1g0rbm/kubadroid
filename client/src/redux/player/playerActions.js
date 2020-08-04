import {NEWS_VOCALIZED, PLAYER_PLAY} from "../types";

export function playToggle(playing, url) {
  return async dispatch => {
    dispatch({type: PLAYER_PLAY, payload: {playing, url}})
  }
}