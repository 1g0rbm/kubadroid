import {NEWS_DELETE, NEWS_LIST, NEWS_APPROVED} from "./types";
import {logout} from "./auth/authActions";

export function loadList(page = 1, limit = 10) {
  return async (dispatch, getState) => {
    const {authData: {token}} = getState()

    const response = await fetch(
      `/api/news/list?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }
    )

    if (response.status === 401) {
      dispatch(logout())
    }

    const json = await response.json()

    dispatch({type: NEWS_LIST, payload: {...json, limit, currentPage: page}})
  }
}

export function deleteNews(newsId) {
  return async (dispatch, getState) => {
    const {authData: {token}, newsList: {currentPage, limit}} = getState()

    const response = await fetch(
      `/api/news/${newsId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }
    )

    if (response.status === 401) {
      dispatch(logout())
    }

    if (response.status !== 200) {
      throw new Error('It is impossible to delete news. Try again later')
    }

    dispatch({type: NEWS_DELETE, payload: {newsId}})
    dispatch(loadList(currentPage, limit))
  }
}

export function approveNews(newsId) {
  return async (dispatch, getState) => {
    const {authData: {token}} = getState()

    const response = await fetch(
      `/api/news/approve/${newsId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }
    )

    if (response.status === 401) {
      dispatch(logout())
    }

    if (response.status !== 200) {
      throw new Error('It is impossible to approve news. Try again later')
    }

    const {approved} = await response.json()

    dispatch({type: NEWS_APPROVED, payload: {newsId, approved}})
  }
}