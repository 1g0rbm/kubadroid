import {AUTH_DATA} from "../types"

const storageName = 'storageData'

export function login({token, userId}) {
  localStorage.setItem(storageName, JSON.stringify({token, userId}))

  return {
    type: AUTH_DATA,
    payload: {token, userId}
  }
}

export function logout() {
  localStorage.removeItem(storageName)
  return {
    type: AUTH_DATA,
    payload: {token: null, userId: null}
  }
}