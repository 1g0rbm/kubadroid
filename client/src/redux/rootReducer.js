import {combineReducers} from "redux"
import {authFormReducer, loginSubmitReducer, registerSubmitReducer} from "./auth/authFormReducer"
import {switchAuthFormReducer} from "./auth/authFormSwitchReducer"
import {authReducer} from "./auth/authReducer"
import {newsListReducer} from "./newsReducer";
import {playerReducer} from "./player/playerReducer";
import {newsEditorReducer} from "./editor/newsEditorReducer";
import {editedNewsReducer} from "./editor/editedNewsReducer";

export const rootReducer = combineReducers({
  form: authFormReducer,
  registerSubmit: registerSubmitReducer,
  loginSubmit: loginSubmitReducer,
  authFormSwitch: switchAuthFormReducer,
  authData: authReducer,
  newsList: newsListReducer,
  player: playerReducer,
  newsEditor: newsEditorReducer,
  editedNews: editedNewsReducer
})