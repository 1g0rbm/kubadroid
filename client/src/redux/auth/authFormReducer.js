import {REGISTER, AUTH_FORM, LOGIN} from "../types";

const initialFormState = {}

export const authFormReducer = (state = initialFormState, {type, payload}) => {
  switch (type) {
    case AUTH_FORM:
      return {...payload}
    default:
      return state
  }
}

const initialSubmitState = {
  errors: [],
  message: null
}

export const registerSubmitReducer = (state = initialSubmitState, {type, payload}) => {
  switch (type) {
    case REGISTER:
      return payload
    default:
      return state
  }
}

const initialLoginSubmitState = {
  errors: [],
  message: null,
  token: null,
  userId: null
}

export const loginSubmitReducer = (state = initialLoginSubmitState, {type, payload}) => {
  switch (type) {
    case LOGIN:
      return payload
    default:
      return state
  }
}