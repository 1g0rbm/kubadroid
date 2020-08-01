import {AUTH_FORM_SWITCH} from "../types";

const initial = 'login'

export const switchAuthFormReducer = (state = initial, {type, payload}) => {
  switch (type) {
    case AUTH_FORM_SWITCH:
      return payload
    default:
      return state
  }
}