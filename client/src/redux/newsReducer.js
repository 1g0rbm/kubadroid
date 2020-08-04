import {NEWS_APPROVED, NEWS_DELETE, NEWS_LIST, NEWS_VOCALIZED} from "./types";

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
      return {
        items: state.items.filter(news => news._id !== payload.newsId),
        currentPage: state.currentPage,
        limit: state.limit,
        total: state.total
      }
    case NEWS_APPROVED:
      return {
        items: state.items.map(news => {
          if (news._id === payload.newsId) {
            news.approved = payload.approved
          }

          return news
        }),
        currentPage: state.currentPage,
        limit: state.limit,
        total: state.total
      }
    case NEWS_VOCALIZED:
      return {
        items: state.items.map(news => {
          if (news._id === payload.newsId) {
            news.filepath = payload.filepath
          }

          return news
        }),
        currentPage: state.currentPage,
        limit: state.limit,
        total: state.total
      }
    default:
      return state
  }
}
