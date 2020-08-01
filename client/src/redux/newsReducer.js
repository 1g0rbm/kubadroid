import {NEWS_LIST} from "./types";

const initialState = {
  items: [],
  currentPage: 1,
  limit: 10,
  total: 0,
}

export const newsListReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case NEWS_LIST:
      return payload
    default:
      return state
  }
}
