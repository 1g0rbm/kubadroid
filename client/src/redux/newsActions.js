import {NEWS_APPROVED, NEWS_DELETE, NEWS_LIST, NEWS_UPDATED, NEWS_VOCALIZED} from "./types";
import {refresh} from "./auth/authActions";

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
      dispatch(refresh(() => loadList(page, limit)))
    }

    const json = await response.json()

    if (json.items && json.items.length === 0 && page > 1) {
      dispatch(loadList(page - 1, limit))
    }

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
      dispatch(refresh(() => deleteNews(newsId)))
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
      dispatch(refresh(() => approveNews(newsId)))
    }

    if (response.status !== 200) {
      throw new Error('It is impossible to approve news. Try again later')
    }

    const {approved} = await response.json()

    dispatch({type: NEWS_APPROVED, payload: {newsId, approved}})
  }
}

export function vocalizeNews(newsId) {
  return async (dispatch, getState) => {
    const {authData: {token}} = getState()

    const response = await fetch(
      `/api/news/vocalize/${newsId}`,
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
      dispatch(refresh(() => vocalizeNews(newsId)))
    }

    if (response.status !== 200) {
      throw new Error('It is impossible to vocalize news. Try again later')
    }

    const {filepath} = await response.json()

    dispatch({type: NEWS_VOCALIZED, payload: {newsId, filepath}})
  }
}

export function updateNews(data) {
  return async (dispatch, getState) => {
    const {authData: {token}, editedNews} = getState()

    const response = await fetch(
      `/api/news/edit/${editedNews._id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data: {...editedNews, ...data}})
      }
    )

    if (response.status !== 200) {
      throw new Error('It is impossible to update news. Try again later')
    }

    dispatch({type: NEWS_UPDATED, payload: {newsId: editedNews._id, ...data}})
  }
}
