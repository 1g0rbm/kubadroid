import {AUTH_FORM_SWITCH, REGISTER, AUTH_FORM, LOGIN, AUTH_DATA} from "../types";
import {login} from "./authActions";

export function extractFormData(payload) {
  return {
    type: AUTH_FORM,
    payload
  }
}

export function sendRegister(form) {
  return async dispatch => {
    const response = await fetch(
      '/api/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(form)
      }
    )
    const json = await response.json()

    dispatch({type: REGISTER, payload: json})
  }
}

export function sendLogin(form) {
  return async dispatch => {
    const response = await fetch(
      '/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(form)
      }
    )
    const json = await response.json()

    dispatch(login(json))
    dispatch({type: LOGIN, payload: json})
  }
}

export function clearRegisterStore() {
  return {
    type: REGISTER,
    payload: {
      message: '',
      errors: [],
    }
  }
}

export function clearLoginStore() {
  return {
    type: LOGIN,
    payload: {
      message: null,
      errors: [],
      token: null,
      userId: null
    }
  }
}

export function switchAuthForm(payload) {
  return {
    type: AUTH_FORM_SWITCH,
    payload
  }
}