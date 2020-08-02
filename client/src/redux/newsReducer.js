import {NEWS_DELETE, NEWS_LIST} from "./types";

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
    case NEWS_DELETE:
      console.log(payload)
      return {
        items: state.items.filter(news => news._id !== payload.newsId),
        currentPage: state.currentPage,
        limit: state.limit,
        total: state.total
      }
    default:
      return state
  }
}
