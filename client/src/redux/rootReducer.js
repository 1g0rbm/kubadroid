import {combineReducers} from "redux"
import {authFormReducer, registerSubmitReducer, loginSubmitReducer} from "./auth/authFormReducer"
import {switchAuthFormReducer} from "./auth/authFormSwitchReducer"
import {authReducer} from "./auth/authReducer"
import {newsListReducer} from "./newsReducer";
import {playerReducer} from "./player/playerReducer";

export const rootReducer = combineReducers({
  form: authFormReducer,
  registerSubmit: registerSubmitReducer,
  loginSubmit: loginSubmitReducer,
  authFormSwitch: switchAuthFormReducer,
  authData: authReducer,
  newsList: newsListReducer,
  player: playerReducer
})