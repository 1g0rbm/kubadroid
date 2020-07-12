import {combineReducers} from "redux"
import {authFormReducer, registerSubmitReducer, loginSubmitReducer} from "./authFormReducer"
import {switchAuthFormReducer} from "./authFormSwitchReducer"
import {authReducer} from "./authReducer"

export const rootReducer = combineReducers({
  form: authFormReducer,
  registerSubmit: registerSubmitReducer,
  loginSubmit: loginSubmitReducer,
  authFormSwitch: switchAuthFormReducer,
  authData: authReducer
})