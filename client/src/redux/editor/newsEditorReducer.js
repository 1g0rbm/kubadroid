import {EditorState} from 'draft-js';
import {EDITOR_NEWS} from "../types";

const initialState = EditorState.createEmpty()

export const newsEditorReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case EDITOR_NEWS:
      return payload
    default:
      return state
  }
}
