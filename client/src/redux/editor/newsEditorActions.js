import {EditorState, ContentState} from 'draft-js';
import {EDITED_NEWS, EDITOR_NEWS} from "../types";

export function loadContentNews(news) {
  return async dispatch => {
    const content = ContentState.createFromText(news.text)
    const state = EditorState.createWithContent(content)

    dispatch({type: EDITED_NEWS, payload: news})
    dispatch({type: EDITOR_NEWS, payload: state})
  }
}
