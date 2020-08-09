import {AUTH_DATA} from "../types"

const storageName = 'storageData'

export function login({token, userId}) {
  const payload = {token, userId, canRefresh: true}
  localStorage.setItem(storageName, JSON.stringify(payload))

  return {
    type: AUTH_DATA,
    payload
  }
}

export function logout() {
  const payload = {token: null, userId: null, canRefresh: false}
  localStorage.setItem(storageName, JSON.stringify(payload))

  return {
    type: AUTH_DATA,
    payload
  }
}

export function refresh(callback = null) {
  return async dispatch => {
    const response = await fetch(
      '/api/auth/refresh',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    )

    console.log('REFRESH: ', response.status)

    if (response.status === 200) {
      const json = await response.json()

      dispatch(login(json))
      callback && dispatch(callback())
    } else {
      dispatch(logout())
    }
  }
}
