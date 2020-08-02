import {NEWS_DELETE, NEWS_LIST} from "./types";
import {logout} from "./auth/authActions";

export function loadList(page = 1, limit = 10) {
  return async dispatch => {
    const {token} = JSON.parse(localStorage.getItem('storageData'))
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
  return async dispatch => {
    const {token} = JSON.parse(localStorage.getItem('storageData'))
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
  }
}