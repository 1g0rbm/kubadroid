import React from "react"
import {useDispatch, useSelector} from "react-redux";
import {clearLoginStore, extractFormData, sendLogin} from "../../redux/authFormActions";
import {useMessage} from "../../hoooks/message.hook";

export default () => {
  const {form, message} = useSelector(({form, loginSubmit, authData}) => {
    return {
      form: form,
      message: loginSubmit.message,
      errors: loginSubmit.errors,
      token: authData.token,
      userId: authData.userId
    }
  })

  const dispatch = useDispatch()
  const showMessage = useMessage()

  if (message) {
    showMessage(message)
    dispatch(clearLoginStore())
  }

  const changeHandler = event => {
    form[event.target.name] = event.target.value
    dispatch(extractFormData(form))
  }

  const submit = event => {
    event.preventDefault()
    dispatch(sendLogin(form))
  }

  return (
    <form>
      <h2 className="center-align">Login</h2>
      <div>
        <div className="input-field">
          <input
            placeholder="Email"
            id="email"
            type="text"
            className="validate"
            name="email"
            onChange={changeHandler}
          />
        </div>
        <div className="input-field">
          <input
            placeholder="Password"
            id="password"
            type="password"
            className="validate"
            name="password"
            onChange={changeHandler}
          />
        </div>
      </div>
      <button
        className="waves-effect waves-light btn-small"
        onClick={submit}
        // disabled={loading}
      >
        Login
      </button>
    </form>
  )
}