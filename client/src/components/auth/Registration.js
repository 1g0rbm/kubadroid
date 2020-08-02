import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {extractFormData, sendRegister, clearRegisterStore} from "../../redux/auth/authFormActions"
import {useMessage} from "../../hoooks/message.hook"

export default () => {
  const {form, message} = useSelector(({form, registerSubmit}) => {
    return {
      form,
      message: registerSubmit.message,
      errors: registerSubmit.errors
    }
  })

  const dispatch = useDispatch()
  const showMessage = useMessage()

  if (message) {
    showMessage(message)
    dispatch(clearRegisterStore())
  }

  const changeHandler = event => {
    form[event.target.name] = event.target.value
    dispatch(extractFormData(form))
  }

  const submit = event => {
    event.preventDefault()
    dispatch(sendRegister(form))
  }

  return (
    <form>
      <h2 className="center-align">Registration</h2>
      <div>
        <div className="input-field">
          <input
            placeholder="Name"
            id="name"
            type="text"
            className="validate"
            name="name"
            onChange={changeHandler}
          />
        </div>
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
      >
        Register
      </button>
    </form>
  )
}