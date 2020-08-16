import {EDITED_NEWS} from "../types";

const initialState = {
  _id: null,
  title: null,
  text: null
}

export const editedNewsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case EDITED_NEWS:
      return payload
    default:
      return state
  }
}
