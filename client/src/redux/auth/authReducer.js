import {AUTH_DATA} from "../types"

const storageName = 'storageData'
const authState = JSON.parse(localStorage.getItem(storageName)) || {
  userId: null,
  token: null
}

export const authReducer = (state = authState, {type, payload}) => {
  switch (type) {
    case AUTH_DATA:
      return payload
    default:
      return state
  }
}